import { Brand as PrismaBrand } from '@prisma/client';

export class Brand implements PrismaBrand {
  id: number;
  name: string;
  active: boolean;
  createdById: number;
  createdAt: Date;
  updatedAt: Date;
}
