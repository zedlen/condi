import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly permisionService: PermissionService,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { isAuthenticated, userId } =
      await this.authService.isAuthenticated(request);
    if (!isAuthenticated) return false;
    const resource = request.route.path.replace('/api/', '');
    return await this.permisionService.checkPermission(
      userId,
      request.method,
      resource,
    );
  }
}
