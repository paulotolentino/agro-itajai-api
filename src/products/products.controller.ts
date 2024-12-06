import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  // Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
// import { AuthorizedRequest } from 'src/types/global';

@Controller('products')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(
  //   @Body() createProductDto: CreateProductDto,
  //   @Req() req: AuthorizedRequest,
  // ) {
  //   const user = req.user; // Pega o usuário anexado à request (via guard ou middleware)
  //   return this.productsService.create({
  //     ...createProductDto,
  //     createdById: user.id,
  //   });
  // }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
