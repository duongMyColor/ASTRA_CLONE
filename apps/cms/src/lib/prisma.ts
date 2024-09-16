import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { AsyncLocalStorage } from 'node:async_hooks';

interface Env extends CloudflareEnv {
  DB: D1Database;
}

interface Storage {
  [key: string]: PrismaClient;
}

const localStorage = new AsyncLocalStorage();

const getStorageKey = (key: string) => {
  const store = localStorage.getStore() as Storage;
  return store ? store[key] : null;
};

const createPrismaClient = () => {
  const env = getRequestContext().env as Env;
  const DB = env.DB;
  const adapter = new PrismaD1(DB);
  const prismaObj = new PrismaClient({ adapter });
  localStorage.run({ prisma: prismaObj }, () => {});
  return prismaObj;
};

const generateClient = () => {
  const existingClient = getStorageKey('prisma');
  return existingClient ? existingClient : createPrismaClient();
};

export { generateClient };
