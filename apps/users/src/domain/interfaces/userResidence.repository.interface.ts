import { Repository } from '@shared/domain/interfaces/repository.interface';
import { UserResidenceEntity } from '@shared/domain/entities/UserResidence.entity';
import { UserResidenceInterface } from '@shared/domain/interfaces/userResidence.interface';

export abstract class UserResidenceResidenceRepository implements Repository {
  abstract find(params: {
    [key: string]: string | number | boolean;
  }): Promise<UserResidenceEntity[]>;
  abstract get(id: string): Promise<UserResidenceEntity | null>;
  abstract getAll(): Promise<UserResidenceEntity[]>;
  abstract save(item: UserResidenceInterface): Promise<UserResidenceEntity>;
  abstract update(item: Partial<UserResidenceInterface>): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract createOrUpdate(
    item: UserResidenceInterface,
  ): Promise<UserResidenceEntity>;
}
