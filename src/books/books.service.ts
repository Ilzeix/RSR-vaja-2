import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private readonly repo: Repository<Book>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const book = await this.repo.findOneBy({ id });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  create(data: Partial<Book>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Book>) {
    const book = await this.findOne(id);
    return this.repo.save(this.repo.merge(book, data));
  }

  async remove(id: number) {
    await this.repo.remove(await this.findOne(id));
  }
}
