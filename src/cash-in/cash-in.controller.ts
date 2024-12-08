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
import { CashInService } from './cash-in.service';
import { CreateCashInDto } from './dto/create-cash-in.dto';
import { UpdateCashInDto } from './dto/update-cash-in.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('cash-in')
@Controller('cash-in')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class CashInController {
  constructor(private readonly cashInService: CashInService) {}

  @ApiOperation({ summary: 'Cria uma nova entrada de caixa' })
  @Post()
  create(
    @Body() createCashInDto: CreateCashInDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user; // Pega o usuário anexado à request (via guard ou middleware)
    return this.cashInService.create({
      ...createCashInDto,
      createdById: user.id,
    });
  }

  @ApiOperation({ summary: 'Busca todas as entradas de caixa' })
  @Get()
  findAll() {
    return this.cashInService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma entrada de caixa pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashInService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza uma entrada de caixa pelo ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashInDto: UpdateCashInDto) {
    return this.cashInService.update(+id, updateCashInDto);
  }

  @ApiOperation({ summary: 'Exclui uma entrada de caixa pelo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashInService.remove(+id);
  }
}
