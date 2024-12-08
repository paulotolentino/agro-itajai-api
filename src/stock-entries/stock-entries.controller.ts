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
import { StockEntriesService } from './stock-entries.service';
import { CreateStockEntryDto } from './dto/create-stock-entry.dto';
// import { UpdateStockEntryDto } from './dto/update-stock-entry.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('stock-entries')
@Controller('stock-entries')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class StockEntriesController {
  constructor(private readonly stockEntriesService: StockEntriesService) {}

  @ApiOperation({ summary: 'Cria uma entrada no estoque' })
  @Post()
  create(
    @Body() createStockEntryDto: CreateStockEntryDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user; // Pega o usuário anexado à request (via guard ou middleware)
    return this.stockEntriesService.create({
      ...createStockEntryDto,
      createdById: user.id,
    });
  }

  @ApiOperation({ summary: 'Busca todas as entradas no estoque' })
  @Get()
  findAll() {
    return this.stockEntriesService.findAll();
  }

  @ApiOperation({ summary: 'Busca todas as entradas no estoque de um produto' })
  @Get('product/:id')
  findAllByProductId(@Param('id') id: string) {
    return this.stockEntriesService.findAllByProductId(+id);
  }

  @ApiOperation({ summary: 'Busca uma entrada no estoque pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockEntriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateStockEntryDto: UpdateStockEntryDto,
  // ) {
  //   return this.stockEntriesService.update(+id, updateStockEntryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stockEntriesService.remove(+id);
  // }
}
