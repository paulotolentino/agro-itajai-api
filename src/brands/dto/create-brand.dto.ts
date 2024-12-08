import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Havana', description: 'Nome da marca' })
  @IsNotEmpty()
  name: string;

  createdById: number;
}
