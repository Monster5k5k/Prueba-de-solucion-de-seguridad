import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrae el token del header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secreto_por_defecto',
    });
  }

  // El payload validado queda disponible como req.user en los controladores
  async validate(payload: { id: number; email: string; perfil: string }) {
    return { id: payload.id, email: payload.email, perfil: payload.perfil };
  }
}
