# FolioIn — Google OAuth & Production Deployment Guide

This guide provides the exact URLs and configuration needed to connect Google Authentication and deploy FolioIn to Vercel.

---

## 1. Google OAuth Credentials & The Two URLs

When setting up Google OAuth in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

1. Go to **APIs & Services** > **Credentials**.
2. Click **Create Credentials** > **OAuth Client ID**.
3. Application Type: **Web application**.
4. Name: `FolioIn`.

### The Two Exact URLs You Need to Paste:

#### A. Authorized JavaScript Origins
Add both your local development origin and your live Vercel production domain:
- **Local:** `http://localhost:3000`
- **Production (Vercel):** `https://YOUR-APP-NAME.vercel.app` *(or your custom domain, e.g. `https://folioin.dev`)*

#### B. Authorized Redirect URIs
Add both your local callback URI and your live Vercel callback URI:
- **Local:** `http://localhost:3000/api/auth/callback/google`
- **Production (Vercel):** `https://YOUR-APP-NAME.vercel.app/api/auth/callback/google`

> [!NOTE]
> The `/api/auth/callback/google` path is automatically handled by NextAuth in `src/app/api/auth/[...nextauth]/route.ts`.

---

## 2. Environment Variables Configuration

Copy your Client ID and Client Secret from Google Cloud Console into your `.env.local` (for local development) and in your **Vercel Project Settings > Environment Variables** (for production):

```env
# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"              # In Vercel: https://YOUR-APP-NAME.vercel.app
NEXTAUTH_SECRET="folioin-dev-super-secret-key-32chars-minimum-hash"

# Gemini AI (for resume tailoring & intake extraction)
GEMINI_API_KEY="your-gemini-api-key"

# Database
DATABASE_URL="file:./dev.db"
```

---

## 3. Deploying to Vercel

All 5 quality commits are recorded on your local `main` branch. To publish them directly to Vercel:

```bash
git push origin main
```

Vercel will detect the push, run `npm run build`, and deploy all 30 static and dynamic routes automatically.
