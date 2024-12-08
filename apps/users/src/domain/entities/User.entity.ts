import { UserPrimitives } from '@shared/domain/interfaces/user.interface';
import { UserID } from '@users/domain/value-objects/user/user.id.valueObject';
import { UserName } from '@users/domain/value-objects/user/user.name.valueObject';
import { UserLastName } from '@users/domain/value-objects/user/user.lastName.valueObject';
import { UserResidenceID } from '@users/domain/value-objects/user/user.residenceId.valueObject';
import { UserRole } from '@users/domain/value-objects/user/user.role.valueObject';
import { UserCondominiumID } from '@users/domain/value-objects/user/user.condominiumId.valueObject';
import { UserEntity } from '@shared/domain/entities/User.entity';
import { UserExternalID } from '@users/domain/value-objects/user/user.externalId.valueObject';
import { UserStatus } from '@users/domain/value-objects/user/user.status.valueObject';
import { UserEmail } from '@users/domain/value-objects/user/user.email.valueObject';

export class User implements UserEntity {
  id: UserID;
  name: UserName;
  lastName: UserLastName;
  status: UserStatus;
  email: UserEmail;
  residencesId: UserResidenceID[];
  condominiumsIds: UserCondominiumID[];
  roles: UserRole[];
  externalId: UserExternalID;

  constructor(
    name: string,
    lastName: string,
    status: string,
    email: string,
    residenceId: string[],
    condominiumsIds: string[],
    roles: string[],
    externalId: string,
    id?: string,
  ) {
    this.id = new UserID(id);
    this.name = new UserName(name);
    this.lastName = new UserLastName(lastName);
    this.status = new UserStatus(status);
    this.email = new UserEmail(email);
    this.residencesId = residenceId.map(
      (residenceId) => new UserResidenceID(residenceId),
    );
    this.condominiumsIds = condominiumsIds.map(
      (condominiumId) => new UserCondominiumID(condominiumId),
    );
    this.roles = roles.map((role) => new UserRole(role));
    this.externalId = new UserExternalID(externalId);
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.toPrimitive(),
      name: this.name.toPrimitive(),
      lastName: this.lastName.toPrimitive(),
      status: this.status.toPrimitive(),
      email: this.email.toPrimitive(),
      residencesId: this.residencesId.map((residenceId) =>
        residenceId.toPrimitive(),
      ),
      condominiumsIds: this.condominiumsIds.map((condominiumId) =>
        condominiumId.toPrimitive(),
      ),
      roles: this.roles.map((role) => role.toPrimitive()),
      externalId: this.externalId.toPrimitive(),
    };
  }
}
