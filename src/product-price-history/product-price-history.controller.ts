import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductPriceHistoryService } from './product-price-history.service';
import { CreateProductPriceHistoryDto } from './dto/create-product-price-history.dto';
import { UpdateProductPriceHistoryDto } from './dto/update-product-price-history.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';

@Controller('product-price-history')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class ProductPriceHistoryController {
  constructor(
    private readonly productPriceHistoryService: ProductPriceHistoryService,
  ) {}

  @Post()
  create(
    @Body() createProductPriceHistoryDto: CreateProductPriceHistoryDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user; // Pega o usuário anexado à request (via guard ou middleware)
    return this.productPriceHistoryService.create({
      ...createProductPriceHistoryDto,
      createdById: user.id,
    });
  }

  @Get()
  findAll() {
    return this.productPriceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPriceHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductPriceHistoryDto: UpdateProductPriceHistoryDto,
  ) {
    return this.productPriceHistoryService.update(
      +id,
      updateProductPriceHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPriceHistoryService.remove(+id);
  }
}
