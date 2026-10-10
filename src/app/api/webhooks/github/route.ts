import { NextResponse } from 'next/server';
import { Webhooks } from '@octokit/webhooks';
import crypto from 'crypto';
import prisma from '@/lib/db';

// Initialize the webhooks instance with the secret from environment
const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET || 'test-secret',
});

// Mock function for auto-generating details from README
function extractDetailsFromReadme(readmeContent: string) {
  // In Stage 4, we will use an LLM here
  // For now, we return basic mock details
  return {
    description: "Auto-extracted description from README.",
    techStack: ["Next.js", "TypeScript"], // Basic mock
  };
}

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-hub-signature-256');
    const event = req.headers.get('x-github-event');
    
    if (!signature || !event) {
      return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
    }

    const payloadText = await req.text();
    
    // Verify webhook signature
    const verified = await webhooks.verify(payloadText, signature);
    if (!verified) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(payloadText);

    // Only process pushes
    if (event === 'push') {
      const repoName = payload.repository.name;
      const topics = payload.repository.topics || [];
      const branch = payload.ref.replace('refs/heads/', '');
      const defaultBranch = payload.repository.default_branch;

      // Filter: ONLY if repo name starts with 'pf-' OR has topic 'portfolio'
      // Also only process pushes to the default branch
      if (
        (repoName.startsWith('pf-') || topics.includes('portfolio')) &&
        branch === defaultBranch
      ) {
        // Here we would use Octokit to fetch the README.md
        // const readme = await octokit.rest.repos.getReadme({ ... })
        // const decodedReadme = Buffer.from(readme.data.content, 'base64').toString()
        
        const details = extractDetailsFromReadme("# Mock Readme Content");
        
        // Find the user by their GitHub account ID
        const githubAccountId = String(payload.sender.id);
        
        const account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: 'github',
              providerAccountId: githubAccountId
            }
          }
        });

        if (account) {
          // Check if project exists, then update or create
          const existingProject = await prisma.project.findFirst({
            where: {
              userId: account.userId,
              repoName: repoName,
            }
          });

          if (existingProject) {
            await prisma.project.update({
              where: { id: existingProject.id },
              data: {
                description: details.description,
                techStack: details.techStack.join(','),
              }
            });
          } else {
            await prisma.project.create({
              data: {
                userId: account.userId,
                repoName: repoName,
                title: repoName.replace('pf-', '').replace(/-/g, ' '),
                description: details.description,
                techStack: details.techStack.join(','),
                githubUrl: payload.repository.html_url,
              }
            });
          }
        }
        
        return NextResponse.json({ 
          message: 'Project sync processed',
          project: { repoName, ...details }
        }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Ignored: Does not match portfolio criteria' }, { status: 200 });
      }
    }

    return NextResponse.json({ message: 'Event not handled' }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
