import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
// import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
// import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('payment-type')
@Controller('payment-type')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  // @ApiOperation({ summary: 'Cria um tipo de pagamento' })
  // @Post()
  // create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
  //   return this.paymentTypeService.create(createPaymentTypeDto);
  // }

  @ApiOperation({ summary: 'Busca todos os tipos de pagamento' })
  @Get()
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @ApiOperation({ summary: 'Busca um tipo de pagamento pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePaymentTypeDto: UpdatePaymentTypeDto,
  // ) {
  //   return this.paymentTypeService.update(+id, updatePaymentTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paymentTypeService.remove(+id);
  // }
}
