import { Module } from '@nestjs/common';
import { DebitPaymentService } from './debit-payment.service';
import { DebitPaymentController } from './debit-payment.controller';

@Module({
  controllers: [DebitPaymentController],
  providers: [DebitPaymentService],
})
export class DebitPaymentModule {}
