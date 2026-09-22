import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  bookId: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  rating: number;
}
