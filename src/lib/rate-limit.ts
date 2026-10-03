import { RateLimiterMemory } from 'rate-limiter-flexible';

export const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});
