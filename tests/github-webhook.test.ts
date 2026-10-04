import { describe, it, expect, vi } from 'vitest';
import crypto from 'crypto';

// Since we are mocking Next.js Request/Response, we just need a basic test for the signature verification logic
import { Webhooks } from '@octokit/webhooks';

describe('GitHub Webhook Signature Verification', () => {
  it('should verify a valid webhook signature', async () => {
    const secret = 'my-test-secret';
    const payload = JSON.stringify({ repository: { name: 'pf-my-project' } });
    
    // Generate valid signature
    const signature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
      
    const headerSignature = `sha256=${signature}`;

    const webhooks = new Webhooks({ secret });
    const isVerified = await webhooks.verify(payload, headerSignature);
    
    expect(isVerified).toBe(true);
  });

  it('should reject an invalid webhook signature', async () => {
    const secret = 'my-test-secret';
    const payload = JSON.stringify({ repository: { name: 'pf-my-project' } });
    
    const invalidSignature = `sha256=invalid123abc`;

    const webhooks = new Webhooks({ secret });
    const isVerified = await webhooks.verify(payload, invalidSignature);
    
    expect(isVerified).toBe(false);
  });
});
