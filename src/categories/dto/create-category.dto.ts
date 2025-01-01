import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Ração', description: 'Nome da categoria' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Ração para cachorro',
    description: 'Descrição da categoria',
  })
  description?: string;

  createdById: number;

  @ApiProperty({
    example: 2,
    description: 'ID da unidade correspondente',
  })
  @IsNumber()
  storeId: number;
}
