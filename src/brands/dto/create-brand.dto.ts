import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Havana', description: 'Nome da marca' })
  @IsNotEmpty()
  name: string;

  createdById: number;

  @ApiProperty({
    example: 2,
    description: 'ID da unidade correspondente',
  })
  @IsNumber()
  storeId: number;
}
