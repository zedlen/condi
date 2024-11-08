import { getAuth } from '@clerk/express';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly permisionService: PermissionService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = getAuth(request);
    if (!auth.userId) return false;

    const resource = request.route.path.replace('/api/', '');
    return await this.permisionService.checkPermission(
      auth.userId,
      request.method,
      resource,
    );
  }
}
