import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StockOutService } from './stock-out.service';
import { CreateStockOutDto } from './dto/create-stock-out.dto';
import { AuthorizedRequest } from 'src/types/global';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('stock-entries')
@Controller('stock-out')
@UseGuards(AuthGuard)
export class StockOutController {
  constructor(private readonly stockOutService: StockOutService) {}

  @ApiOperation({ summary: 'Cria uma saída no estoque' })
  @Post()
  create(
    @Body() createStockOutDto: CreateStockOutDto,
    @Req() req: AuthorizedRequest,
  ) {
    const { user, storeId } = req;
    return this.stockOutService.create({
      ...createStockOutDto,
      createdById: user.id,
      storeId,
    });
  }

  @ApiOperation({ summary: 'Busca todas as saidas do estoque' })
  @Get()
  findAll() {
    return this.stockOutService.findAll();
  }

  @ApiOperation({
    summary: 'Busca todas as saídas do estoque de uma unidade',
  })
  @Get('store/:id')
  findAllByStoreId(@Param('id') id: string) {
    return this.stockOutService.findAllByStoreId(+id);
  }

  @ApiOperation({ summary: 'Busca todas as saídas do estoque de um produto' })
  @Get('product/:id')
  findAllByProductId(@Param('id') id: string) {
    return this.stockOutService.findAllByProductId(+id);
  }

  @ApiOperation({ summary: 'Busca uma saída do estoque pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockOutService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateStockOutDto: UpdateStockOutDto,
  // ) {
  //   return this.stockOutService.update(+id, updateStockOutDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stockOutService.remove(+id);
  // }
}
