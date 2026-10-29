import { IsNotEmpty, IsDateString } from 'class-validator';
import { NotInFuture } from '../ni-v-prihodnosti.decorator'; // Popravi glede na to, kako se imenuje tvoja datoteka z dekoraterjem (npr. ni-v-prihodnosti ali not-in-future)

export class CreateLoanDto {
  @IsNotEmpty()
  @IsDateString()
  @NotInFuture({ message: 'loanedAt ne sme biti datum v prihodnosti.' })
  loanedAt: string;
}