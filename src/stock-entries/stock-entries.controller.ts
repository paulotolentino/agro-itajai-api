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

@Controller('stock-entries')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class StockEntriesController {
  constructor(private readonly stockEntriesService: StockEntriesService) {}

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

  @Get()
  findAll() {
    return this.stockEntriesService.findAll();
  }

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
