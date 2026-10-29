import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt() // zagotavlja, da je minAge celo število in zavrne decimalke
  @Min(0, { message: 'Minimalna starost mora biti vsaj 0.' })
  @Max(18, { message: 'Minimalna starost je lahko največ 18.' })
  minAge: number;
}