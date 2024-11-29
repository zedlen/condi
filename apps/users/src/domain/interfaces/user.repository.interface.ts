import { Repository } from '@shared/domain/interfaces/repository.interface';
import { UserEntity } from '@shared/domain/entities/User.entity';
import { UserPrimitives } from '@shared/domain/interfaces/user.interface';

export abstract class UserRepository implements Repository {
  abstract find(params: {
    [key: string]: string | number | boolean;
  }): Promise<UserEntity[]>;
  abstract get(id: string): Promise<UserEntity | null>;
  abstract getAll(): Promise<UserEntity[]>;
  abstract save(item: UserPrimitives): Promise<UserEntity>;
  abstract update(item: Partial<UserPrimitives>): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract createOrUpdate(item: UserPrimitives): Promise<UserEntity>;
}
