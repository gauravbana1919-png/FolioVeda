import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/chat/portfolio/route';

describe('Chat Portfolio API', () => {
  it('should return dark theme updates when requested in fallback mode', async () => {
    const req = new Request('http://localhost:3000/api/chat/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'switch to dark mode please',
        currentProfile: { bio: 'Hello world' },
        templateId: 'template1',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.updates).toBeDefined();
    expect(data.updates.theme).toBe('dark');
    expect(data.reply).toContain('dark mode');
  });

  it('should return emerald accent update when requested', async () => {
    const req = new Request('http://localhost:3000/api/chat/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'use emerald accent color',
        currentProfile: { bio: 'Hello world' },
        templateId: 'template1',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.updates.accentColor).toBe('emerald');
  });

  it('should return updated bio when asked to punch up bio', async () => {
    const req = new Request('http://localhost:3000/api/chat/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'punch up my bio',
        currentProfile: { bio: 'I make code' },
        templateId: 'template1',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.updates.bio).toBeDefined();
    expect(data.reply).toContain('bio');
  });
});
