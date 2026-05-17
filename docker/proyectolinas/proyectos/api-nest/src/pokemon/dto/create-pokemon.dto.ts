import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsNumber()
  @Min(1)
  hp: number;

  @IsNumber()
  @Min(1)
  ataque: number;

  @IsNumber()
  @Min(1)
  defensa: number;
}
