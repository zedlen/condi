import { User } from '@clerk/express';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/users/invite.users.dto';
import { Request } from 'express';
import { UserEntity } from '@shared/domain/entities/User.entity';
export abstract class AuthService {
  abstract inviteUser(
    data: InviteUserRequestDTO,
    user: UserEntity,
  ): Promise<void>;
  abstract getUser(userId: string): Promise<User>;
  abstract isAuthenticated(
    req: Request,
  ): Promise<{ isAuthenticated: boolean; userId: string }>;
}
