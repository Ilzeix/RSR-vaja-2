import { IsNotEmpty, IsString, IsInt} from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt() //naloga 1; zagotavlja, da je minAge celo številoin zavrne decimalke; 
  //vključiti ga moremo tudi v 'main.ts' ( vključen mora biti globalni ValidationPipe )
  minAge: number;
}
