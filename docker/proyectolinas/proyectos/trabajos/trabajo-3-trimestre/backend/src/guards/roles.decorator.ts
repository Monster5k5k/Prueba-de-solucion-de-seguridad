import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

// Decorador para marcar qué roles pueden acceder a una ruta
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
