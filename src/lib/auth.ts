import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || 'mock',
      clientSecret: process.env.GITHUB_SECRET || 'mock',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || 'mock',
      clientSecret: process.env.GOOGLE_SECRET || 'mock',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};
