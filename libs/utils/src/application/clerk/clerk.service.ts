import { Injectable } from '@nestjs/common';
import { ClerkClient, createClerkClient, Invitation } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ClerkService {
  private clerkClient: ClerkClient;
  constructor(
    private configServide: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const secretKey = this.configServide.get('CLERK_SECRET_KEY');
    this.clerkClient = createClerkClient({
      secretKey,
    });
  }

  inviteUser(data: InviteUserRequestDTO): Promise<Invitation> {
    return this.clerkClient.invitations.createInvitation({
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
  }
}
