import { IsNotEmpty } from 'class-validator';

export class SignOutDto {
  @IsNotEmpty()
  token: string;
}
