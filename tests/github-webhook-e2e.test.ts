import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import crypto from 'crypto';
import prisma from '@/lib/db';
import { POST } from '@/app/api/webhooks/github/route';

describe('GitHub Webhook E2E Ingestion', () => {
  const secret = process.env.GITHUB_WEBHOOK_SECRET || 'test-secret';
  let testUserId = '';
  const testGitHubId = '999888777';

  beforeAll(async () => {
    // Clean up any previous test user
    await prisma.user.deleteMany({
      where: { email: 'e2e-webhook@example.com' },
    });

    // Create a real test user linked with a GitHub OAuth account
    const user = await prisma.user.create({
      data: {
        name: 'E2E Webhook Dev',
        email: 'e2e-webhook@example.com',
        accounts: {
          create: {
            type: 'oauth',
            provider: 'github',
            providerAccountId: testGitHubId,
          },
        },
      },
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    // Clean up after tests
    if (testUserId) {
      await prisma.project.deleteMany({
        where: { userId: testUserId },
      });
      await prisma.account.deleteMany({
        where: { userId: testUserId },
      });
      await prisma.user.deleteMany({
        where: { id: testUserId },
      });
    }
  });

  function signPayload(payloadStr: string) {
    return 'sha256=' + crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');
  }

  it('should reject webhook with invalid signature', async () => {
    const payload = JSON.stringify({
      ref: 'refs/heads/main',
      repository: { name: 'pf-security-scanner', default_branch: 'main' },
      sender: { id: testGitHubId },
    });

    const req = new Request('http://localhost:3000/api/webhooks/github', {
      method: 'POST',
      headers: {
        'x-hub-signature-256': 'sha256=invalid-signature',
        'x-github-event': 'push',
      },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('Invalid signature');
  });

  it('should ignore repo that does NOT start with pf- or have portfolio topic', async () => {
    const payload = JSON.stringify({
      ref: 'refs/heads/main',
      repository: {
        name: 'random-utility-library',
        topics: ['tools', 'utilities'],
        default_branch: 'main',
        html_url: 'https://github.com/developer/random-utility-library',
      },
      sender: { id: testGitHubId },
    });

    const signature = signPayload(payload);

    const req = new Request('http://localhost:3000/api/webhooks/github', {
      method: 'POST',
      headers: {
        'x-hub-signature-256': signature,
        'x-github-event': 'push',
      },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toContain('Ignored');

    // Confirm nothing was inserted into database
    const project = await prisma.project.findFirst({
      where: { userId: testUserId, repoName: 'random-utility-library' },
    });
    expect(project).toBeNull();
  });

  it('should automatically ingest repo starting with pf- and save to Prisma DB', async () => {
    const payload = JSON.stringify({
      ref: 'refs/heads/main',
      repository: {
        name: 'pf-cloud-orchestrator',
        topics: ['cloud', 'devops'],
        default_branch: 'main',
        html_url: 'https://github.com/developer/pf-cloud-orchestrator',
      },
      sender: { id: testGitHubId },
    });

    const signature = signPayload(payload);

    const req = new Request('http://localhost:3000/api/webhooks/github', {
      method: 'POST',
      headers: {
        'x-hub-signature-256': signature,
        'x-github-event': 'push',
      },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('Project sync processed');
    expect(body.project.repoName).toBe('pf-cloud-orchestrator');

    // Verify record in Prisma SQLite DB
    const savedProject = await prisma.project.findFirst({
      where: { userId: testUserId, repoName: 'pf-cloud-orchestrator' },
    });
    expect(savedProject).not.toBeNull();
    expect(savedProject?.title).toBe('cloud orchestrator');
    expect(savedProject?.githubUrl).toBe('https://github.com/developer/pf-cloud-orchestrator');
  });

  it('should update existing project on subsequent push', async () => {
    const payload = JSON.stringify({
      ref: 'refs/heads/main',
      repository: {
        name: 'pf-cloud-orchestrator',
        topics: ['cloud', 'kubernetes'],
        default_branch: 'main',
        html_url: 'https://github.com/developer/pf-cloud-orchestrator',
      },
      sender: { id: testGitHubId },
    });

    const signature = signPayload(payload);

    const req = new Request('http://localhost:3000/api/webhooks/github', {
      method: 'POST',
      headers: {
        'x-hub-signature-256': signature,
        'x-github-event': 'push',
      },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const count = await prisma.project.count({
      where: { userId: testUserId, repoName: 'pf-cloud-orchestrator' },
    });
    // Should still be exactly 1 record (upserted, not duplicated)
    expect(count).toBe(1);
  });
});
