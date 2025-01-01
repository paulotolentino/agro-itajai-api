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
import { CashBalanceService } from './cash-balance.service';
import { CreateCashBalanceDto } from './dto/create-cash-balance.dto';
import { UpdateCashBalanceDto } from './dto/update-cash-balance.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthorizedRequest } from 'src/types/global';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('cash-balance')
@Controller('cash-balance')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class CashBalanceController {
  constructor(private readonly cashBalanceService: CashBalanceService) {}

  @ApiOperation({ summary: 'Abre o caixa' })
  @Post()
  create(
    @Body() createCashBalanceDto: CreateCashBalanceDto,
    @Req() req: AuthorizedRequest,
  ) {
    const { user, storeId } = req; // Pega o usuário anexado à request (via guard ou middleware)
    return this.cashBalanceService.create({
      ...createCashBalanceDto,
      createdById: user.id,
      storeId,
    });
  }

  @ApiOperation({ summary: 'Abre o caixa' })
  @Patch(':id/close')
  close(@Param('id') id: string) {
    return this.cashBalanceService.close(+id);
  }

  @ApiOperation({ summary: 'Abre o caixa' })
  @Patch(':id/reopen')
  reopen(@Param('id') id: string) {
    return this.cashBalanceService.reopen(+id);
  }

  @ApiOperation({ summary: 'Busca todos os caixas' })
  @Get()
  findAll() {
    return this.cashBalanceService.findAll();
  }

  @ApiOperation({ summary: 'Busca os últimos registros de caixa e os abertos' })
  @Get('dashboard')
  findLast3AndNotClosedByStoreId(@Req() req: AuthorizedRequest) {
    const { storeId } = req;
    return this.cashBalanceService.findLast3AndNotClosedByStoreId(+storeId);
  }

  @ApiOperation({ summary: 'Busca todos os caixas de uma unidade' })
  @Get('store/cash-balance')
  findAllByStoreId(@Req() req: AuthorizedRequest) {
    const { storeId } = req;
    return this.cashBalanceService.findAllByStoreId(storeId);
  }

  @ApiOperation({ summary: 'Busca todos os caixas de uma unidade por mês' })
  @Get('store/monthYear/:monthYear/cash-balance')
  findAllByStoreIdByMonthYear(
    @Req() req: AuthorizedRequest,
    @Param('monthYear') monthYear: string,
  ) {
    const { storeId } = req;
    const date = new Date(monthYear);
    return this.cashBalanceService.findAllByStoreIdByMonthYear(storeId, date);
  }

  @ApiOperation({ summary: 'Busca um caixa pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashBalanceService.findOne(+id);
  }

  @ApiOperation({ summary: 'Busca o lucro dentro do mês' })
  @Get('store/monthYear/:monthYear/month-profit')
  profit(@Req() req: AuthorizedRequest, @Param('monthYear') monthYear: string) {
    const { storeId } = req;
    const date = new Date(monthYear);
    return this.cashBalanceService.profit(storeId, date);
  }

  @ApiOperation({ summary: 'Atualiza um caixa pelo ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCashBalanceDto: UpdateCashBalanceDto,
  ) {
    return this.cashBalanceService.update(+id, updateCashBalanceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cashBalanceService.remove(+id);
  // }
}
