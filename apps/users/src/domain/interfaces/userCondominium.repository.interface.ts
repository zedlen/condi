import { Repository } from '@shared/domain/interfaces/repository.interface';
import { UserCondominiumEntity } from '@shared/domain/entities/UserCondominium.entity';
import { UserCondominiumInterface } from '@shared/domain/interfaces/userCondominium.interface';

export abstract class UserCondominiumRepository implements Repository {
  abstract find(params: {
    [key: string]: string | number | boolean;
  }): Promise<UserCondominiumEntity[]>;
  abstract get(id: string): Promise<UserCondominiumEntity | null>;
  abstract getAll(): Promise<UserCondominiumEntity[]>;
  abstract save(item: UserCondominiumInterface): Promise<UserCondominiumEntity>;
  abstract update(item: Partial<UserCondominiumInterface>): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract createOrUpdate(
    item: UserCondominiumInterface,
  ): Promise<UserCondominiumEntity>;
}
