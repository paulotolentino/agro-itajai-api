export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  cost: number;
  brandId: number;
  stock: number;
  active: boolean;
  categoryId: number;
  createdById: number;
}
