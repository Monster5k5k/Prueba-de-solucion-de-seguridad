import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTarkovDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  peso: number;

  @IsBoolean()
  @IsOptional()
  encontradoEnIncursion?: boolean;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
