import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(Author) private readonly repo: Repository<Author>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const author = await this.repo.findOneBy({ id });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  create(data: Partial<Author>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Author>) {
    const author = await this.findOne(id);
    return this.repo.save(this.repo.merge(author, data));
  }

  async remove(id: number) {
    await this.repo.remove(await this.findOne(id));
  }
}
