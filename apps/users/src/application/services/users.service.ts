import { ClerkWebhookDto } from '@shared/infrastructure/dtos/clerk.webhook.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';
import { User } from '@users/domain/entities/User.entity';
import { v4 } from 'uuid';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly authService: AuthService,
    private readonly permissionService: PermissionService,
  ) {}

  saveUser(clerkWebhookData: ClerkWebhookDto) {
    const { data } = clerkWebhookData;
    const user = new User(
      //id
      v4(),
      //name
      data['first_name'],
      //lastName
      data['last_name'],
      //status
      '',
      //residenceId
      data?.['public_metadata']?.['residenceId'],
      //condominiumsIds
      data?.['public_metadata']?.['condominiumsIds'],
      //rolesIds
      data?.['public_metadata']?.['rolesIds'],
      //externalId
      data?.['id'],
    );

    this.permissionService.createUser(user);
    this.logger.log(user);
  }

  async inviteUser(data: InviteUserRequestDTO) {
    await this.authService.inviteUser(data);
  }
}
