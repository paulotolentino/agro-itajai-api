import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  createdById: number;

  @ApiProperty({
    example: 'Ração Nero 10kg sabor carne',
    description: 'Nome do produto',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Embalagem nova',
    description: 'Descrição do produto',
  })
  description?: string;

  @ApiProperty({ example: 100, description: 'Valor de venda do produto' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 50, description: 'Valor de custo do produto' })
  @IsNumber()
  cost: number;

  @ApiProperty({ example: 1, description: 'ID da marca' })
  @IsNumber()
  brandId: number;

  @ApiProperty({ example: 15, description: 'Quantidade comprada' })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: true, description: 'Produto ativo ou inativo' })
  @IsNumber()
  active: boolean;

  @ApiProperty({ example: 1, description: 'ID da categoria' })
  @IsNumber()
  categoryId: number;
}
