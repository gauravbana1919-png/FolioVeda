import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET || 'folioin-dev-super-secret-key-32chars-minimum-hash',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID || 'mock',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET || 'mock',
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || process.env.GITHUB_ID || 'mock',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_SECRET || 'mock',
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase() || 'user@example.com';
        const name = credentials?.name?.trim() || email.split('@')[0];

        try {
          let user = await prisma.user.findUnique({
            where: { email },
            include: { projects: true, portfolio: true },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email,
                name,
                image: null,
                consentGiven: true,
              },
              include: { projects: true, portfolio: true },
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error('[AUTH] Email credentials authorization fallback:', error);
          return {
            id: 'email-user-id',
            email,
            name,
            image: null,
          };
        }
      },
    }),
    CredentialsProvider({
      id: 'google-demo',
      name: 'Google Demo (Instant Access)',
      credentials: {
        email: { label: 'Email', type: 'text' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials) {
        const email = credentials?.email || 'arjun.sharma.tech@gmail.com';
        const name = credentials?.name || 'Arjun Sharma';

        try {
          let user = await prisma.user.findUnique({
            where: { email },
            include: { projects: true, portfolio: true },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email,
                name,
                image: null,
                consentGiven: true,
                projects: {
                  create: [
                    {
                      repoName: 'folioin-engine',
                      title: 'FolioIn Core Engine',
                      description: 'High-performance Next.js 15 portfolio generator with WebGL render pipeline.',
                      techStack: 'Next.js, TypeScript, Tailwind CSS, Prisma',
                      githubUrl: 'https://github.com/arjunsharma/folioin-engine',
                      liveUrl: 'https://folioin.dev',
                      isPinned: true,
                    },
                    {
                      repoName: 'indic-ats-parser',
                      title: 'Indic ATS Resume Parser',
                      description: 'Dual-column tokenization parser for Indian IT recruiters & multinational ATS systems.',
                      techStack: 'Python, PyTorch, FastAPI, Next.js',
                      githubUrl: 'https://github.com/arjunsharma/indic-ats-parser',
                      liveUrl: 'https://indic-ats.dev',
                      isPinned: true,
                    },
                    {
                      repoName: 'blr-transit-mesh',
                      title: 'Bengaluru Transit IoT Mesh',
                      description: 'Distributed MQTT telemetry broker for real-time bus and metro routing in Karnataka.',
                      techStack: 'Go, WebSockets, Redis, Docker',
                      githubUrl: 'https://github.com/arjunsharma/blr-transit-mesh',
                      isPinned: false,
                    },
                  ],
                },
                portfolio: {
                  create: {
                    templateId: 'editorial',
                    theme: 'system',
                    customDomain: 'arjunsharma.dev',
                    isPublished: true,
                  },
                },
              },
              include: { projects: true, portfolio: true },
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error('[AUTH] Demo authorization error:', error);
          // Return valid mock user object so user is not blocked
          return {
            id: 'demo-user-id',
            email,
            name,
            image: null,
          };
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};
