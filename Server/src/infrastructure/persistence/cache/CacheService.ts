import NodeCache from 'node-cache';
import { logger } from '../../../config/logger';

export class CacheService {
  private static instance: CacheService;
  private cache: NodeCache;

  private constructor() {
    this.cache = new NodeCache({
      stdTTL: 60, // Default Time To Live: 60 seconds
      checkperiod: 120, // Cleanup period: 120 seconds
    });

    // Cache events monitoring
    this.cache.on('expired', (key: string, value: unknown) => {
      logger.debug(`Cache key expired: ${key}`);
    });

    this.cache.on('del', (key: string, value: unknown) => {
      logger.debug(`Cache key deleted: ${key}`);
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  public set<T>(key: string, value: T, ttl: number = 60): boolean {
    return this.cache.set(key, value, ttl);
  }

  public del(key: string): number {
    return this.cache.del(key);
  }

  public flush(): void {
    this.cache.flushAll();
  }

  public getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }

  public generateKey(...args: unknown[]): string {
    return args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(':');
  }
} 