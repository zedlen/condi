import { User } from '@users/domain/entities/User.entity';

export abstract class PermissionService {
  abstract checkPermission(
    userId: string,
    action: string,
    resource: string,
  ): Promise<boolean>;
  abstract createUser(user: User): Promise<boolean>;
}
