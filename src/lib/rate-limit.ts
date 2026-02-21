// lib/rate-limit.ts
import LRUCache from 'lru-cache';

const tokenCache = new LRUCache<string, number[]>({
  max: 500, 
  ttl: 60000, 
});

export const rateLimit = (options: { uniqueTokenPerInterval: number; interval: number }) => {
  return {
    check: (limit: number, token: string) => {
      const tokenCount = tokenCache.get(token) || [0];
      
      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }
      
      tokenCount[0] += 1;
      
      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;

      return {
        isRateLimited,
        remaining: isRateLimited ? 0 : limit - currentUsage,
      };
    },
  };
};

const limiter = rateLimit({
  interval: 60000,
  uniqueTokenPerInterval: 500,
});

export default limiter;