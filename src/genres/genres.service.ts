import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private readonly repo: Repository<Genre>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const genre = await this.repo.findOneBy({ id });
    if (!genre) throw new NotFoundException('Genre not found');
    return genre;
  }

  create(data: Partial<Genre>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Genre>) {
    const genre = await this.findOne(id);
    return this.repo.save(this.repo.merge(genre, data));
  }
}
