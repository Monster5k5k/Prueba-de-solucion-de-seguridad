import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard que valida el JWT en rutas protegidas
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
