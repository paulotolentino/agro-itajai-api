import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'john_doe', description: 'Usuário' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123*', description: 'Senha' })
  @IsNotEmpty()
  password: string;
}
