import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private readonly repo: Repository<Review>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const review = await this.repo.findOneBy({ id });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  create(data: Partial<Review>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Review>) {
    const review = await this.findOne(id);
    return this.repo.save(this.repo.merge(review, data));
  }
}
