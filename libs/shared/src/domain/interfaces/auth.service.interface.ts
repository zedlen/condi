import { User } from '@clerk/express';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';

export abstract class AuthService {
  abstract inviteUser(data: InviteUserRequestDTO): Promise<void>;
  abstract getUser(userId: string): Promise<User>;
}
