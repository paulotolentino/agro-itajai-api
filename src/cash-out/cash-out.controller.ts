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
import { CashOutService } from './cash-out.service';
import { CreateCashOutDto } from './dto/create-cash-out.dto';
import { UpdateCashOutDto } from './dto/update-cash-out.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('cash-out')
@Controller('cash-out')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class CashOutController {
  constructor(private readonly cashOutService: CashOutService) {}

  @ApiOperation({ summary: 'Cria uma nova saída de caixa' })
  @Post()
  create(
    @Body() createCashOutDto: CreateCashOutDto,
    @Req() req: AuthorizedRequest,
  ) {
    const user = req.user; // Pega o usuário anexado à request (via guard ou middleware)
    return this.cashOutService.create({
      ...createCashOutDto,
      createdById: user.id,
    });
  }

  @ApiOperation({ summary: 'Busca todas as saídas de caixa' })
  @Get()
  findAll() {
    return this.cashOutService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma saída de caixa pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashOutService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza uma saída de caixa pelo ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashOutDto: UpdateCashOutDto) {
    return this.cashOutService.update(+id, updateCashOutDto);
  }

  @ApiOperation({ summary: 'Exclui uma saída de caixa pelo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashOutService.remove(+id);
  }
}
