import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsInt()
  bookId: number;

  @IsInt()
  memberId: number;

  @IsString()
  loanedAt: string;

  @IsBoolean()
  returned: boolean;

  @IsInt()
  durationDays: number;
}
