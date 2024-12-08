import { UserEntity } from '@shared/domain/entities/User.entity';

export abstract class PermissionService {
  abstract checkPermission(
    userId: string,
    action: string,
    resource: string,
  ): Promise<boolean>;
  abstract createUser(user: UserEntity): Promise<boolean>;
  abstract validateTenantExists(tenant: string): Promise<boolean>;
  abstract validateRoleExists(role: string): Promise<boolean>;
  abstract createCondominium(
    name: string,
  ): Promise<{ isCreated: boolean; externalId: string; error?: Error }>;
}
