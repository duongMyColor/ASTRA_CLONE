import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

const generatePrismaClient = (DB: D1Database) => {
  const adapter = new PrismaD1(DB);
  return new PrismaClient({
    adapter,
  });
};

export { generatePrismaClient };
