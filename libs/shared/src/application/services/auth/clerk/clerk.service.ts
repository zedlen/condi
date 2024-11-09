import { Injectable, Logger } from '@nestjs/common';
import { ClerkClient, createClerkClient, User } from '@clerk/express';
import { ConfigService } from '@nestjs/config';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';

@Injectable()
export class ClerkService implements AuthService {
  private readonly logger = new Logger(ClerkService.name);
  private clerkClient: ClerkClient;
  constructor(private configServide: ConfigService) {
    const secretKey = this.configServide.get('CLERK_SECRET_KEY');
    this.clerkClient = createClerkClient({
      secretKey,
    });
  }

  async inviteUser(data: InviteUserRequestDTO): Promise<void> {
    try {
      await this.clerkClient.invitations.createInvitation({
        emailAddress: data.email,
        publicMetadata: {
          roleIds: data.roleIds,
          condominiumsIds: data.condominiumsIds,
          resideceIds: data.residencesIds,
          name: data.name,
          lastName: data.lastName,
        },
        notify: true,
      });
    } catch (error) {
      this.logger.error({ error, data });
    }
  }

  getUser(userId: string): Promise<User> {
    return this.clerkClient.users.getUser(userId);
  }
}