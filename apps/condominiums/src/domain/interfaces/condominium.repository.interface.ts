import { Repository } from '@shared/domain/interfaces/repository.interface';
import { CondominiumEntity } from '@shared/domain/entities/Condominium.entity';
import { CondominiumPrimitives } from '@shared/domain/interfaces/condominium.interface';

export abstract class CondominiumRepository implements Repository {
  abstract find(params: {
    [key: string]: string | number | boolean;
  }): Promise<CondominiumEntity[]>;
  abstract get(id: string): Promise<CondominiumEntity | null>;
  abstract getAll(): Promise<CondominiumEntity[]>;
  abstract save(item: CondominiumPrimitives): Promise<CondominiumEntity>;
  abstract update(item: Partial<CondominiumPrimitives>): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract createOrUpdate(
    item: CondominiumPrimitives,
  ): Promise<CondominiumEntity>;
}
