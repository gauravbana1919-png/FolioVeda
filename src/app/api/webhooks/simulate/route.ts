import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let targetUserId: string | null = null;
    let githubAccountId = '12345678';

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { accounts: true },
      });
      if (user) {
        targetUserId = user.id;
        const ghAccount = user.accounts.find(a => a.provider === 'github');
        if (ghAccount) {
          githubAccountId = ghAccount.providerAccountId;
        } else {
          // Link a mock GitHub account to this user if not present
          const createdAccount = await prisma.account.create({
            data: {
              userId: user.id,
              type: 'oauth',
              provider: 'github',
              providerAccountId: githubAccountId,
            },
          });
        }
      }
    }

    if (!targetUserId) {
      // Find or create a demo user for local simulation
      let demoUser = await prisma.user.findFirst({
        where: { email: 'demo@folioveda.dev' },
        include: { accounts: true },
      });

      if (!demoUser) {
        demoUser = await prisma.user.create({
          data: {
            name: 'Alex Developer',
            email: 'demo@folioveda.dev',
            accounts: {
              create: {
                type: 'oauth',
                provider: 'github',
                providerAccountId: githubAccountId,
              },
            },
          },
          include: { accounts: true },
        });
      }
      targetUserId = demoUser.id;
    }

    // Sample repo names for realistic simulation
    const sampleRepos = [
      { name: 'pf-autonomous-agent', desc: 'Autonomous reasoning engine powered by Gemini 2.5 Flash and Next.js.', tech: 'Next.js, TypeScript, Gemini API' },
      { name: 'pf-distributed-kv-cache', desc: 'High-throughput in-memory distributed key-value store with raft consensus.', tech: 'Go, Raft, Docker' },
      { name: 'pf-neural-search-indexer', desc: 'Vector search indexing pipeline with pgvector and hybrid BM25 scoring.', tech: 'Python, FastAPI, PostgreSQL' },
      { name: 'pf-crypto-analytics-engine', desc: 'Real-time WebSocket market depth analyzer with order book visualization.', tech: 'React, Tailwind, WebSockets' },
    ];

    // Pick a random repo from samples or read request body
    const body = await req.json().catch(() => ({}));
    const chosen = sampleRepos.find(r => r.name === body.repoName) || sampleRepos[Math.floor(Math.random() * sampleRepos.length)];

    const secret = process.env.GITHUB_WEBHOOK_SECRET || 'test-secret';
    const payload = JSON.stringify({
      ref: 'refs/heads/main',
      repository: {
        name: chosen.name,
        topics: ['portfolio', 'dev'],
        default_branch: 'main',
        html_url: `https://github.com/developer/${chosen.name}`,
      },
      sender: {
        id: githubAccountId,
      },
    });

    const signature = 'sha256=' + crypto.createHmac('sha256', secret).update(payload).digest('hex');

    // Call the actual webhook endpoint internally to test end-to-end
    const webhookReq = new Request('http://localhost:3000/api/webhooks/github', {
      method: 'POST',
      headers: {
        'x-hub-signature-256': signature,
        'x-github-event': 'push',
      },
      body: payload,
    });

    const { POST: webhookHandler } = await import('@/app/api/webhooks/github/route');
    const webhookRes = await webhookHandler(webhookReq);
    const webhookData = await webhookRes.json();

    return NextResponse.json({
      success: true,
      simulatedRepo: chosen.name,
      webhookResponse: webhookData,
      message: `Successfully processed GitHub push webhook for repository "${chosen.name}"!`,
    });
  } catch (error: any) {
    console.error('Webhook simulation error:', error);
    return NextResponse.json({ error: error.message || 'Simulation error' }, { status: 500 });
  }
}
