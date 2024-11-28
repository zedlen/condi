import { ClerkWebhookDto } from '@shared/infrastructure/dtos/clerk.webhook.dto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';
import { v4 } from 'uuid';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';
import { BulkCreateUserRequestDTO } from '@shared/infrastructure/dtos/bulk.create.users.dto';
import { UserRepository } from '@users/domain/interfaces/user.repository.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly authService: AuthService,
    private readonly permissionService: PermissionService,
    private readonly userRepository: UserRepository,
  ) {}

  async saveUser(clerkWebhookData: ClerkWebhookDto) {
    const { data } = clerkWebhookData;
    const user = await this.userRepository.createOrUpdate({
      //name
      name: data['first_name'],
      //lastName
      lastName: data['last_name'],
      //status
      status: 'CONFIRMED',
      //email
      email: data['email_addresses']?.[0]?.['email_address'],
      //residenceId
      residencesId: data?.['public_metadata']?.['resideceIds'],
      //condominiumsIds
      condominiumsIds: data?.['public_metadata']?.['condominiumsIds'],
      //rolesIds
      roles: data?.['public_metadata']?.['roleIds'],
      //externalId
      externalId: data?.['id'],
      //id
      id: data?.['public_metadata']?.['userId'] || v4(),
    });
    await this.permissionService.createUser(user);
    this.logger.log('User to be saved on db', user);
  }

  async inviteUser(data: InviteUserRequestDTO) {
    const tenantsExists = await Promise.all(
      data.condominiumsIds.map((condominiumId) =>
        this.permissionService.validateTenantExists(condominiumId),
      ),
    );
    if (!tenantsExists.every((exists) => exists))
      throw new BadRequestException(
        'Some condominiums may not exists',
        'not-a-condominum',
      );
    const rolesExists = await Promise.all(
      data.roleIds.map((roleId) =>
        this.permissionService.validateRoleExists(roleId),
      ),
    );
    if (!rolesExists.every((exists) => exists))
      throw new BadRequestException('Some roles may not exists', 'not-a-role');
    const newUser = await this.userRepository.save({
      //name
      name: data.name,
      //lastName
      lastName: data.lastName,
      //status
      status: 'INVITED',
      //email
      email: data.email,
      //residenceId
      residencesId: data.residencesIds,
      //condominiumsIds
      condominiumsIds: data.condominiumsIds,
      //rolesIds
      roles: data.roleIds,
      //externalId
      externalId: '',
      id: '',
    });
    await this.authService.inviteUser(data, newUser);
  }

  async bulkCreateUsers(requestData: BulkCreateUserRequestDTO) {
    const { data, requestId } = requestData;

    const responses = await Promise.allSettled(
      data.map(async (user) => {
        //TODO: create contanst to map file columns could be usefull also when creating a new file.
        const newOwner: InviteUserRequestDTO = {
          name: user['Nombre Propietarion'],
          lastName: user['Apellido Propietario'],
          email: user['Correo Propietario'],
          roleIds: ['owner'], //TODO: fix this to use a constant
          condominiumsIds: [user['Condominio']], //this will be the external ID
          residencesIds: [user['ID']], // this is the already created residence that will be assigned to the user; Maybe save relation on user save?
          requestId,
        };
        const ownerResponse = await this.inviteUser(newOwner);
        let coOwnerResponse;
        if (user['Nombre Co propietario']) {
          const newCoOwner: InviteUserRequestDTO = {
            name: user['Nombre Co Propietarion'],
            lastName: user['Apellido Co Propietario'],
            email: user['Correo Co Propietario'],
            roleIds: ['co_owner'], //TODO: fix this to use a constant
            condominiumsIds: [user['Condominio']],
            residencesIds: [user['ID']], // this is the already created residence that will be assigned to the user; Maybe save relation on user save?
            requestId,
          };
          coOwnerResponse = await this.inviteUser(newCoOwner);
          throw new Error();
        }
        return { ownerResponse, coOwnerResponse };
      }),
    );
    return data.map((user, index) => ({
      ...user,
      status: responses[index].status,
      response: responses[index]['reason'],
    }));
  }
}
