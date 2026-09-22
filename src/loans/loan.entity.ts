import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @Column()
  memberId: number;

  @Column()
  loanedAt: string;

  @Column()
  returned: boolean;

  @Column()
  durationDays: number;
}
