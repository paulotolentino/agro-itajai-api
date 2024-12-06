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

@Controller('cash-in')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class CashInController {
  constructor(private readonly cashInService: CashInService) {}

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

  @Get()
  findAll() {
    return this.cashInService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashInService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashInDto: UpdateCashInDto) {
    return this.cashInService.update(+id, updateCashInDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashInService.remove(+id);
  }
}
