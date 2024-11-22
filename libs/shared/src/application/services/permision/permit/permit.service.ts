import { Action } from '@shared/domain/enums/action.enum';
import { Resource } from '@shared/domain/enums/resource.enum';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';
import { UserEntity } from '@shared/domain/entities/User.entity';
import { Permit } from 'permitio';

@Injectable()
export class PermitService implements PermissionService {
  private permit: Permit;
  private readonly logger = new Logger(PermissionService.name);
  constructor(private readonly configService: ConfigService) {
    const permitToken = this.configService.get('PERMIT_TOKEN');
    this.permit = new Permit({
      // in production, you might need to change this url to fit your deployment
      pdp: 'https://cloudpdp.api.permit.io',
      // your api key
      token: permitToken,
    });
  }

  checkPermission(
    userId: string,
    action: string,
    resource: string,
  ): Promise<boolean> {
    const actualResource = Resource[resource];
    const actualAction = Action[action];
    return this.permit.check(userId, actualAction, actualResource);
  }

  async createUser(user: UserEntity): Promise<boolean> {
    const userPrimitives = user.toPrimitives();
    try {
      const userCreated = this.permit.api.createUser({
        key: userPrimitives.externalId,
        email: userPrimitives.email,
        first_name: userPrimitives.name,
        last_name: userPrimitives.lastName,
        role_assignments: [
          ...userPrimitives?.roles
            ?.map?.((role) =>
              userPrimitives?.condominiumsIds?.map?.((condominiumId) => ({
                role,
                tenant: condominiumId as string,
              })),
            )
            .flat(),
        ],
        attributes: {
          condominiums: userPrimitives.condominiumsIds,
        },
      });
      this.logger.log(userCreated);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async validateTenantExists(tenantId: string): Promise<boolean> {
    try {
      const tenant = await this.permit.api.getTenant(tenantId);
      return !!tenant;
    } catch (error) {
      return false;
    }
  }
  async validateRoleExists(roleId: string): Promise<boolean> {
    try {
      const role = await this.permit.api.getRole(roleId);
      return !!role;
    } catch (error) {
      return false;
    }
  }
}
