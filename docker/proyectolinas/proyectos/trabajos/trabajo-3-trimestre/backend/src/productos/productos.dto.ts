import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  @ApiProperty({ example: 'Camiseta azul' })
  @IsString()
  nombre: string;

  @ApiPropertyOptional({ example: 'Camiseta de algodón 100%' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 29.99 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiPropertyOptional({ example: 'https://example.com/imagen.jpg' })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiProperty({ example: 100 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;
}

export class UpdateProductoDto {
  @ApiPropertyOptional({ example: 'Camiseta azul' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Camiseta de algodón 100%' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 29.99 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precio?: number;

  @ApiPropertyOptional({ example: 'https://example.com/imagen.jpg' })
  @IsOptional()
  @IsString()
  imagen?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock?: number;
}
