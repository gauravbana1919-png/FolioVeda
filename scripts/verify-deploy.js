const fs = require('fs');
const path = require('path');

console.log('🚀 FolioVeda Vercel Pre-Flight Readiness Check');
console.log('--------------------------------------------------');

let allPassed = true;

// 1. Check package.json build script
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const hasPrismaBuild = (pkg.scripts?.build?.includes('prisma generate')) || (pkg.scripts?.['build:prod']?.includes('prisma generate'));
if (hasPrismaBuild) {
  console.log('✓ package.json: includes production build script with "prisma generate"');
} else {
  console.log('✗ package.json: build script missing "prisma generate"');
  allPassed = false;
}

// 2. Check .gitignore
const gitignore = fs.readFileSync(path.join(__dirname, '..', '.gitignore'), 'utf8');
if (gitignore.includes('.env*') && gitignore.includes('prisma/dev.db')) {
  console.log('✓ .gitignore: protects .env secrets and local dev.db database');
} else {
  console.log('✗ .gitignore: missing protection for secrets or dev.db');
  allPassed = false;
}

// 3. Check .env.example
const envExample = fs.readFileSync(path.join(__dirname, '..', '.env.example'), 'utf8');
const requiredKeys = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL', 'GITHUB_ID', 'GITHUB_SECRET', 'GEMINI_API_KEY', 'GITHUB_WEBHOOK_SECRET'];
const missingKeys = requiredKeys.filter(k => !envExample.includes(k));
if (missingKeys.length === 0) {
  console.log('✓ .env.example: all 7 required environment variables documented');
} else {
  console.log('✗ .env.example: missing keys:', missingKeys);
  allPassed = false;
}

// 4. Check schema.postgresql.prisma
if (fs.existsSync(path.join(__dirname, '..', 'prisma', 'schema.postgresql.prisma'))) {
  console.log('✓ prisma/schema.postgresql.prisma: ready for Neon/Supabase cloud PostgreSQL');
} else {
  console.log('✗ prisma/schema.postgresql.prisma: missing');
  allPassed = false;
}

console.log('--------------------------------------------------');
if (allPassed) {
  console.log('🎉 ALL CHECKS PASSED! FolioVeda is 100% ready for Vercel deployment.');
  process.exit(0);
} else {
  console.log('⚠️ Some pre-flight checks failed. Please review the items above.');
  process.exit(1);
}
