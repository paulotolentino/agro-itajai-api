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
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';

@Controller('brands')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(
    @Body() createBrandDto: CreateBrandDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user; // Pega o usuário anexado à request (via guard ou middleware)
    return this.brandsService.create({
      ...createBrandDto,
      createdById: user.id,
    });
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
