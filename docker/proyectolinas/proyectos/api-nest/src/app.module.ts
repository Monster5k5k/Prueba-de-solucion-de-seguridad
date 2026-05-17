import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { LibrosModule } from './libros/libros.module';
import { TarkovModule } from './tarkov/tarkov.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'ctl_postgre',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'nestasir',
      password: process.env.DB_PASS || 'admin123',
      database: process.env.DB_NAME || 'nestasir',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuarioModule,
    PeliculasModule,
    PokemonModule,
    LibrosModule,
    TarkovModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
