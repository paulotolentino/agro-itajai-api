import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  createdById: number;

  @ApiProperty({ example: 'João', description: 'Nome do cliente' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Cabeção', description: 'Apelido do cliente' })
  nickname?: string;

  @ApiProperty({ example: '19989999999', description: 'Telefone do cliente' })
  phone?: string;

  @ApiProperty({
    example: 'Vizinho do Zé',
    description: 'Observação sobre o cliente',
  })
  observation?: string;

  @ApiProperty({ example: '123.456.789-00', description: 'CPF do cliente' })
  cpf?: string;
}
