import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AddCarritoDto {
  @ApiProperty({ example: 1, description: 'ID del producto a añadir' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  productoId: number;

  @ApiPropertyOptional({ example: 1, description: 'Cantidad (por defecto 1)' })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  cantidad: number = 1;
}

export class UpdateCarritoDto {
  @ApiProperty({ example: 3, description: 'Nueva cantidad' })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  cantidad: number;
}
