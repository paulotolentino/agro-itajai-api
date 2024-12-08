import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignOutDto {
  @ApiProperty({ description: 'Token JWT' })
  @IsNotEmpty()
  token: string;
}
