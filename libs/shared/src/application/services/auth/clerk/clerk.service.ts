import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ClerkClient, createClerkClient, getAuth, User } from '@clerk/express';
import { ConfigService } from '@nestjs/config';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';
import { Request } from 'express';
import { UserEntity } from '@shared/domain/entities/User.entity';
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

  async inviteUser(
    data: InviteUserRequestDTO,
    user: UserEntity,
  ): Promise<void> {
    try {
      await this.clerkClient.invitations.createInvitation({
        emailAddress: data.email,
        publicMetadata: {
          roleIds: data.roleIds,
          condominiumsIds: data.condominiumsIds,
          resideceIds: data.residencesIds,
          name: data.name,
          lastName: data.lastName,
          userId: user.id.toPrimitive(),
        },
        notify: true,
      });
    } catch (error) {
      this.logger.error({ error, data });
      if (error?.clerkError)
        throw new HttpException(
          {
            error: error?.errors?.[0]?.code,
            message: error?.errors?.[0]?.message,
          },
          error?.status || 500,
        );
    }
  }

  getUser(userId: string): Promise<User> {
    return this.clerkClient.users.getUser(userId);
  }

  async isAuthenticated(
    req: Request,
  ): Promise<{ isAuthenticated: boolean; userId: string }> {
    const auth = getAuth(req);
    if (!auth.userId) return { isAuthenticated: false, userId: '' };
    return { isAuthenticated: true, userId: auth.userId };
  }
}
