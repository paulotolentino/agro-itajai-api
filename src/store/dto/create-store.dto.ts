import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  createdById: number;

  @ApiProperty({ example: 'Itajaí', description: 'Nome da unidade' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Ração', description: 'Endereço da unidade' })
  address?: string;

  @ApiProperty({ example: 'Ração', description: 'Telefone da unidade' })
  phone?: string;
}
