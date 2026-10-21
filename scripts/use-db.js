const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const target = process.argv[2] || 'sqlite';
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const postgresPath = path.join(__dirname, '..', 'prisma', 'schema.postgresql.prisma');

if (target === 'postgres' || target === 'postgresql') {
  if (!fs.existsSync(postgresPath)) {
    console.error('PostgreSQL schema template not found!');
    process.exit(1);
  }
  fs.copyFileSync(postgresPath, schemaPath);
  console.log('✓ Switched Prisma schema to PostgreSQL (production mode).');
} else {
  let content = fs.readFileSync(schemaPath, 'utf8');
  content = content.replace(
    /datasource db \{[\s\S]*?\}/,
    `datasource db {\n  provider = "sqlite"\n  url      = "file:./dev.db"\n}`
  );
  fs.writeFileSync(schemaPath, content, 'utf8');
  console.log('✓ Switched Prisma schema to SQLite (local dev mode).');
}

try {
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✓ Prisma client generated successfully.');
} catch (e) {
  console.error('Failed to generate Prisma client:', e);
  process.exit(1);
}
