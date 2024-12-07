import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DebitPaymentService } from './debit-payment.service';
import { CreateDebitPaymentDto } from './dto/create-debit-payment.dto';
// import { UpdateDebitPaymentDto } from './dto/update-debit-payment.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';

@Controller('debit-payment')
@UseGuards(AuthGuard)
export class DebitPaymentController {
  constructor(private readonly debitPaymentService: DebitPaymentService) {}

  @Post()
  create(
    @Body() createDebitPaymentDto: CreateDebitPaymentDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user;
    return this.debitPaymentService.create({
      ...createDebitPaymentDto,
      createdById: user.id,
    });
  }

  @Get()
  findAll() {
    return this.debitPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debitPaymentService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDebitPaymentDto: UpdateDebitPaymentDto,
  // ) {
  //   return this.debitPaymentService.update(+id, updateDebitPaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.debitPaymentService.remove(+id);
  // }
}
