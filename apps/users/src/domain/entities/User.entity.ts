import { Entity } from '@shared/domain/interfaces/entity.interface';
import { UserPrimitives } from '@users/domain/interfaces/user.interface';
import { UserID } from '@users/domain/value-objects/user/user.id.valueObject';
import { UserName } from '@users/domain/value-objects/user/user.name.valueObject';
import { UserLastName } from '@users/domain/value-objects/user/user.lastName.valueObject';
import { UserResidenceID } from '@users/domain/value-objects/user/user.residenceId.valueObject';
import { UserRole } from '@users/domain/value-objects/user/user.role.valueObject';
import { UserCondominiumID } from '@users/domain/value-objects/user/user.condominiumId.valueObject';

export class User implements Entity {
  id: UserID;
  name: UserName;
  lastName: UserLastName;
  status: string; // to be defined how this will be worked.
  residenceId: UserResidenceID;
  condominiumsIds: UserCondominiumID[];
  roles: UserRole[];
  externalId: string;

  constructor(
    id: string,
    name: string,
    lastName: string,
    status: string,
    residenceId: string,
    condominiumsId: string[],
    roles: string[],
    externalId: string,
  ) {
    this.id = new UserID(id);
    this.name = new UserName(name);
    this.lastName = new UserLastName(lastName);
    this.status = status;
    this.residenceId = new UserResidenceID(residenceId);
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
      residenceId: this.residenceId.toPrimitive(),
      condominiumsIds: this.condominiumsIds.map((condominiumId) =>
        condominiumId.toPrimitive(),
      ),
      roles: this.roles.map((role) => role.toPrimitive()),
      externalId: this.externalId,
    };
  }
}
