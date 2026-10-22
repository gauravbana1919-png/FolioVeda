import { describe, it, expect } from 'vitest';
import { generateMetadata } from '@/app/p/[username]/page';

describe('Public Portfolio Metadata', () => {
  it('should generate accurate dynamic OpenGraph metadata for a user', async () => {
    const params = Promise.resolve({ username: 'alex-developer' });
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe("alex-developer's Portfolio | Built with FolioVeda");
    expect(metadata.description).toContain('alex-developer');
    expect(metadata.openGraph?.title).toBe('alex-developer - Professional Portfolio');
  });

  it('should decode URL-encoded username in metadata', async () => {
    const params = Promise.resolve({ username: 'Jane%20Doe' });
    const metadata = await generateMetadata({ params });

    expect(metadata.title).toBe("Jane Doe's Portfolio | Built with FolioVeda");
    expect(metadata.description).toContain('Jane Doe');
    expect(metadata.openGraph?.title).toBe('Jane Doe - Professional Portfolio');
  });
});
