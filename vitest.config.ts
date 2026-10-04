import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
    pool: 'forks', // Try forks again but with single thread or just false
    poolOptions: { forks: { singleFork: true } }
  },
});
