export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  brandId: number;
  stock: number;
  createdById: number;
  categoryId: number;
}
