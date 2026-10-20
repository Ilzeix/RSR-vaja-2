import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.loansService.findOne(id);
  }

  @Post()
  create(@Body() body: UpdateLoanDto) { //CreatLoanDto --> UpdateLoanDto
    return this.loansService.create(body);
  }

  @Patch(':id')
update(@Param('id') id: number, @Body() body: UpdateLoanDto) {
  return this.loansService.update(id, body);
}

}