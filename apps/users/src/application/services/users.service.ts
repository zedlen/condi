import { ClerkWebhookDto } from '@shared/infrastructure/dtos/clerk.webhook.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly authService: AuthService) {}
  saveUser(data: ClerkWebhookDto) {
    this.logger.log(data);
  }

  async inviteUser(data: InviteUserRequestDTO) {
    await this.authService.inviteUser(data);
  }
}
