import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getExpDebitSettings = async () => {
  const settings = await prisma.settings.findFirst();
  return settings?.daysToExpireDebit || 30; // Default: 30 days
};
