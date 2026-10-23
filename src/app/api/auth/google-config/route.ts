import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID;
  const isRealGoogle = Boolean(
    clientId &&
    clientId !== 'mock' &&
    !clientId.startsWith('your-') &&
    clientId.length > 20
  );

  return NextResponse.json({
    isConfigured: isRealGoogle,
    mode: isRealGoogle ? 'oauth' : 'dev',
  });
}
