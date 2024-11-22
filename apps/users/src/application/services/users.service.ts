import { ClerkWebhookDto } from '@shared/infrastructure/dtos/clerk.webhook.dto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InviteUserRequestDTO } from '@shared/infrastructure/dtos/invite.users.dto';
import { AuthService } from '@shared/domain/interfaces/auth.service.interface';
import { User } from '@users/domain/entities/user.entity';
import { v4 } from 'uuid';
import { PermissionService } from '@shared/domain/interfaces/permission.service.interface';
import { BulkCreateUserRequestDTO } from '@shared/infrastructure/dtos/bulk.create.users.dto';
import { isArrayBuffer } from 'util/types';
import { ExcelService } from '@shared/domain/interfaces/file/file.excel.service.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly authService: AuthService,
    private readonly permissionService: PermissionService,
    private readonly excelService: ExcelService,
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
      //email
      data['email_addresses']?.[0]?.['email_address'],
      //residenceId
      data?.['public_metadata']?.['resideceIds'],
      //condominiumsIds
      data?.['public_metadata']?.['condominiumsIds'],
      //rolesIds
      data?.['public_metadata']?.['roleIds'],
      //externalId
      data?.['id'],
    );

    this.permissionService.createUser(user);
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
    await this.authService.inviteUser(data);
  }

  async bulkCreateUsers(data: BulkCreateUserRequestDTO) {
    const { file, requestId } = data;
    const buffer = isArrayBuffer(file) ? file : file.buffer;
    const fileData = await this.excelService.readFileBuffer(buffer);

    console.log({ data: fileData.get('NuevosResidentes'), requestId });
  }
}
