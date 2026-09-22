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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.genresService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateGenreDto) {
    return this.genresService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateGenreDto) {
    return this.genresService.update(id, body);
  }
}
