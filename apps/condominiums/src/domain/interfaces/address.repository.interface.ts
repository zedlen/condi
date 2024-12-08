import { Repository } from '@shared/domain/interfaces/repository.interface';
import { AddressEntity } from '@shared/domain/entities/Address.entity';
import { AddressPrimitives } from '@shared/domain/interfaces/address.interface';

export abstract class AddressRepository implements Repository {
  abstract find(params: {
    [key: string]: string | number | boolean;
  }): Promise<AddressEntity[]>;
  abstract get(id: string): Promise<AddressEntity | null>;
  abstract getAll(): Promise<AddressEntity[]>;
  abstract save(item: AddressPrimitives): Promise<AddressEntity>;
  abstract update(item: Partial<AddressPrimitives>): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
  abstract createOrUpdate(item: AddressPrimitives): Promise<AddressEntity>;
}
