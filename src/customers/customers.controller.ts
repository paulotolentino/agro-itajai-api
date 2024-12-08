import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthorizedRequest } from 'src/types/global';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
@UseGuards(AuthGuard) // Aplica o guard em todas as rotas deste controlador
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Cria um novo cliente' })
  @Post()
  create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() req: AuthorizedRequest,
  ) {
    const { user } = req;
    return this.customersService.create({
      ...createCustomerDto,
      createdById: user.id,
    });
  }

  @ApiOperation({ summary: 'Busca todos os clientes' })
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiOperation({ summary: 'Busca um cliente pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza um cliente pelo ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @ApiOperation({ summary: 'Exclui um cliente pelo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
