import { PaymentType as PrismaPaymentType } from '@prisma/client';

export class PaymentType implements PrismaPaymentType {
  active: boolean;
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
}
