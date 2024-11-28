import { Entity } from '@shared/domain/interfaces/entity.interface';

export abstract class Repository {
  abstract find(params: {
    [key: string]: string | number | boolean;
  }): Promise<Entity[]>;
  abstract get(id: string): Promise<Entity | null>;
  abstract getAll(): Promise<Entity[]>;
  abstract save(item: object): Promise<Entity>;
  abstract update(item: object): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
}
