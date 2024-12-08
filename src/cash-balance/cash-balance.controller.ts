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
    const user = req.user; // Pega o usuário anexado à request (via guard ou middleware)
    return this.cashBalanceService.create({
      ...createCashBalanceDto,
      createdById: user.id,
    });
  }

  @ApiOperation({ summary: 'Busca todos os caixas' })
  @Get()
  findAll() {
    return this.cashBalanceService.findAll();
  }

  @ApiOperation({ summary: 'Busca um caixa pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashBalanceService.findOne(+id);
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
