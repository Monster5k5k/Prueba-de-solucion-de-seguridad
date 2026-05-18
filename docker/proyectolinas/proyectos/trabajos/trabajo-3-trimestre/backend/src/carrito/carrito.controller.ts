import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CarritoService } from './carrito.service';
import { AddCarritoDto, UpdateCarritoDto } from './carrito.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

// Todas las rutas del carrito requieren autenticación JWT
@ApiTags('Carrito')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Get()
  @ApiOperation({ summary: 'Ver carrito activo del usuario' })
  @ApiResponse({ status: 200, description: 'Ítems del carrito sin pagar' })
  getCarrito(@Request() req) {
    return this.carritoService.getCarrito(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Añadir producto al carrito' })
  @ApiResponse({ status: 201, description: 'Producto añadido al carrito' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  addProducto(@Request() req, @Body() dto: AddCarritoDto) {
    return this.carritoService.addProducto(req.user.id, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar cantidad de un ítem del carrito' })
  @ApiResponse({ status: 200, description: 'Cantidad actualizada' })
  @ApiResponse({ status: 404, description: 'Ítem no encontrado' })
  updateCantidad(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() dto: UpdateCarritoDto,
  ) {
    return this.carritoService.updateCantidad(id, req.user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ítem del carrito' })
  @ApiResponse({ status: 200, description: 'Ítem eliminado' })
  @ApiResponse({ status: 404, description: 'Ítem no encontrado' })
  removeItem(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.carritoService.removeItem(id, req.user.id);
  }

  @Post('pagar')
  @ApiOperation({ summary: 'Pagar todos los ítems del carrito activo' })
  @ApiResponse({ status: 201, description: 'Pago realizado correctamente' })
  @ApiResponse({ status: 400, description: 'El carrito está vacío' })
  pagar(@Request() req) {
    return this.carritoService.pagar(req.user.id);
  }
}
