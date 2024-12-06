import { PartialType } from '@nestjs/mapped-types';
import { CreateCashInDto } from './create-cash-in.dto';

export class UpdateCashInDto extends PartialType(CreateCashInDto) {}
