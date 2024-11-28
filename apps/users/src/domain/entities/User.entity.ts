import { UserPrimitives } from '@shared/domain/interfaces/user.interface';
import { UserID } from '@users/domain/value-objects/user/user.id.valueObject';
import { UserName } from '@users/domain/value-objects/user/user.name.valueObject';
import { UserLastName } from '@users/domain/value-objects/user/user.lastName.valueObject';
import { UserResidenceID } from '@users/domain/value-objects/user/user.residenceId.valueObject';
import { UserRole } from '@users/domain/value-objects/user/user.role.valueObject';
import { UserCondominiumID } from '@users/domain/value-objects/user/user.condominiumId.valueObject';
import { UserEntity } from '@shared/domain/entities/User.entity';

export class User implements UserEntity {
  id: UserID;
  name: UserName;
  lastName: UserLastName;
  status: string; //TODO: create VO
  email: string; //TODO: create VO
  residencesId: UserResidenceID[];
  condominiumsIds: UserCondominiumID[];
  roles: UserRole[];
  externalId: string;

  constructor(
    name: string,
    lastName: string,
    status: string,
    email: string,
    residenceId: string[],
    condominiumsId: string[],
    roles: string[],
    externalId: string,
    id?: string,
  ) {
    this.id = new UserID(id);
    this.name = new UserName(name);
    this.lastName = new UserLastName(lastName);
    this.status = status;
    this.email = email;
    this.residencesId = residenceId.map(
      (residenceId) => new UserResidenceID(residenceId),
    );
    this.condominiumsIds = condominiumsId.map(
      (condominiumId) => new UserCondominiumID(condominiumId),
    );
    this.roles = roles.map((role) => new UserRole(role));
    this.externalId = externalId;
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.toPrimitive(),
      name: this.name.toPrimitive(),
      lastName: this.lastName.toPrimitive(),
      status: this.status,
      email: this.email,
      residencesId: this.residencesId.map((residenceId) =>
        residenceId.toPrimitive(),
      ),
      condominiumsIds: this.condominiumsIds.map((condominiumId) =>
        condominiumId.toPrimitive(),
      ),
      roles: this.roles.map((role) => role.toPrimitive()),
      externalId: this.externalId,
    };
  }
}
