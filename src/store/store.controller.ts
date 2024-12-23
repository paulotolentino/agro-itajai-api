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
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';

@ApiBearerAuth()
@ApiTags('store')
@UseGuards(AuthGuard)
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiOperation({ summary: 'Cria uma nova unidade' })
  @Post()
  create(
    @Body() createStoreDto: CreateStoreDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user;
    return this.storeService.create({
      ...createStoreDto,
      createdById: user.id,
    });
  }

  @ApiOperation({ summary: 'Busca todas as unidades' })
  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma unidade pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza uma unidade pelo ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  // @ApiOperation({ summary: 'Exclui uma categoria pelo ID' })
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.storeService.remove(+id);
  // }
}
