import { PartialType } from '@nestjs/mapped-types';
import { CreateCashOutDto } from './create-cash-out.dto';

export class UpdateCashOutDto extends PartialType(CreateCashOutDto) {}
