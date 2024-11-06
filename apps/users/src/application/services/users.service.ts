import { ClerkWebhookDto } from '@shared/infrastructure/dtos/clerk.webhook.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor() {}
  saveUser(data: ClerkWebhookDto) {
    this.logger.log(data);
  }

  inviteUser(data: InviteUserRequestDTO) {
    this.logger.log(data);
  }
}
