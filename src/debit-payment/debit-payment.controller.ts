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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('debit-payment')
@Controller('debit-payment')
@UseGuards(AuthGuard)
export class DebitPaymentController {
  constructor(private readonly debitPaymentService: DebitPaymentService) {}

  @ApiOperation({ summary: 'Cria um pagamento de fiado' })
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

  @ApiOperation({ summary: 'Busca todos os pagamentos de fiado' })
  @Get()
  findAll() {
    return this.debitPaymentService.findAll();
  }

  @ApiOperation({ summary: 'Atualiza um pagamento de fiado pelo ID' })
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
