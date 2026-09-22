import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';

@Injectable()
export class LoansService {
  constructor(@InjectRepository(Loan) private readonly repo: Repository<Loan>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const loan = await this.repo.findOneBy({ id });
    if (!loan) throw new NotFoundException('Loan not found');
    return loan;
  }

  create(data: Partial<Loan>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Loan>) {
    const loan = await this.findOne(id);
    return this.repo.save(this.repo.merge(loan, data));
  }
}
