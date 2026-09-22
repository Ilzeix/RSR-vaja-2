import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authorsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateAuthorDto) {
    return this.authorsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Partial<Author>) {
    return this.authorsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.authorsService.remove(id);
  }
}
