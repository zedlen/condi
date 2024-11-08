import { Action } from '@condi/domain/enums/action.enum';
import { Resource } from '@condi/domain/enums/resource.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';
import { User } from '@users/domain/entities/User.entity';
import { Permit } from 'permitio';

@Injectable()
export class PermitService implements PermissionService {
  private permit: Permit;
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

  async createUser(user: User): Promise<boolean> {
    const userPrimitives = user.toPrimitives();
    const userCreated = this.permit.api.createUser({
      key: userPrimitives.externalId,
      email: userPrimitives.status,
      first_name: userPrimitives.name,
      last_name: userPrimitives.lastName,
      role_assignments: [
        {
          role: '',
          tenant: '',
        },
      ],
      attributes: {
        condominiums: userPrimitives.condominiumsIds,
      },
    });
    console.log(userCreated);
    return true;
  }
}
