import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';

@ApiTags('Upload')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('upload')
export class UploadController {
  @Post('imagen')
  @ApiOperation({ summary: 'Subir imagen de producto (solo admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          // Nombre único: timestamp + extensión original
          const nombre = `${Date.now()}${extname(file.originalname)}`;
          cb(null, nombre);
        },
      }),
      fileFilter: (_req, file, cb) => {
        // Solo imágenes
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('Solo se permiten imágenes (jpg, png, gif, webp)'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5MB
    }),
  )
  uploadImagen(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');

    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3001}`;
    return {
      url: `${backendUrl}/uploads/${file.filename}`,
      filename: file.filename,
    };
  }
}
