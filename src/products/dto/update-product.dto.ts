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

  @ApiProperty({
    example: 'kg',
    description: 'Unidade de medida do produto',
  })
  measureUnit?: string;

  @ApiProperty({ example: 1, description: 'ID da marca' })
  @IsNumber()
  brandId: number;

  @ApiProperty({ example: true, description: 'Produto ativo ou inativo' })
  @IsNumber()
  active: boolean;

  @ApiProperty({ example: 1, description: 'ID da categoria' })
  @IsNumber()
  categoryId: number;
}
