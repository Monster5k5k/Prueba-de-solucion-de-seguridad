import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lee los roles requeridos definidos en el decorador @Roles(...)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no tiene @Roles, es accesible para cualquier usuario autenticado
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!requiredRoles.includes(user?.perfil)) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso',
      );
    }

    return true;
  }
}
