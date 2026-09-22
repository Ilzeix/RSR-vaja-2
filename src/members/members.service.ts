import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private readonly repo: Repository<Member>) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const member = await this.repo.findOneBy({ id });
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  create(data: Partial<Member>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Member>) {
    const member = await this.findOne(id);
    return this.repo.save(this.repo.merge(member, data));
  }

  async remove(id: number) {
    await this.repo.remove(await this.findOne(id));
  }
}
