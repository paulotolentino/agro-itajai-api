import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Cria uma nova venda' })
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user;
    return this.orderService.create({
      ...createOrderDto,
      createdById: user.id,
    });
  }

  @ApiOperation({ summary: 'Busca todas as vendas' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma venda pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Busca todas as vendas pela data' })
  @Get('date/:date')
  findAllByDate(@Param('date') date: string) {
    return this.orderService.findAllByDate(date);
  }

  @ApiOperation({ summary: 'Atualiza uma venda pelo ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
