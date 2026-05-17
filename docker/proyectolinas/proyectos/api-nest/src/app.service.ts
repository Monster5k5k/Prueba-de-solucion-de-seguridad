import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): object {
    return {
      nombre: 'API Linas',
      version: '1.0.0',
      autor: 'Linas',
      modulos: ['usuario', 'peliculas', 'pokemon', 'libros', 'tarkov'],
      estado: 'funcionando',
    };
  }
}
