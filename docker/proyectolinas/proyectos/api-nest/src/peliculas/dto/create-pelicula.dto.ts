import { IsDateString, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsDateString()
  fechaEstreno: string;

  @IsNumber()
  @Min(1)
  duracion: number;
}
