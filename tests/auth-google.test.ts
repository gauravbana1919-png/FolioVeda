import { describe, it, expect, vi } from 'vitest';
import { authOptions } from '@/lib/auth';

describe('Google Authentication Configuration & NextAuth Provider Suite', () => {
  it('should register GoogleProvider as an active authentication provider', () => {
    const googleProvider = authOptions.providers.find(
      (p: any) => p.id === 'google'
    );
    expect(googleProvider).toBeDefined();
    expect(googleProvider?.name).toBe('Google');
    expect(googleProvider?.type).toBe('oauth');
  });

  it('should register Credentials demo provider for 1-click test access', () => {
    const demoProvider = authOptions.providers.find(
      (p: any) => p.id === 'credentials' || (p as any).options?.id === 'google-demo'
    );
    expect(demoProvider).toBeDefined();
    expect(demoProvider?.type).toBe('credentials');
  });

  it('should enforce JWT session strategy for stateless edge scalability', () => {
    expect(authOptions.session?.strategy).toBe('jwt');
  });

  it('should have session and jwt callbacks configured to attach user ID', async () => {
    expect(authOptions.callbacks?.session).toBeDefined();
    expect(authOptions.callbacks?.jwt).toBeDefined();

    const dummyUser = { id: 'usr_test_123', email: 'test@folioveda.com', name: 'Test User' };
    const dummyToken = { sub: 'usr_test_123' };

    // JWT callback test
    const jwtResult = await authOptions.callbacks!.jwt!({
      token: dummyToken,
      user: dummyUser as any,
      account: null as any,
    });
    expect(jwtResult.sub).toBe('usr_test_123');

    // Session callback test
    const sessionResult = await authOptions.callbacks!.session!({
      session: { user: { name: 'Test User', email: 'test@folioveda.com' }, expires: '2099-01-01' },
      token: jwtResult,
      user: dummyUser as any,
      newSession: null,
      trigger: 'update',
    });
    expect((sessionResult.user as any).id).toBe('usr_test_123');
  });
});
