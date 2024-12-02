import { Brand as PrismaBrand } from '@prisma/client';

export class Brand implements PrismaBrand {
  id: number;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
