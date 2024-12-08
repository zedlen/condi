import { Address } from '@condominiums/domain/entities/address.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AddressEntity as AddressInterface } from '@shared/domain/entities/Address.entity';
import { Address as AddressModel } from '@shared/domain/schemas/address.schema';
import { AddressRepository as AddressRepositoryInterface } from '@condominiums/domain/interfaces/address.repository.interface';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { AddressPrimitives } from '@shared/domain/interfaces/address.interface';

export class AddressRepository implements AddressRepositoryInterface {
  constructor(
    @InjectModel(AddressModel.name)
    private addressModel: Model<AddressModel>,
  ) {}

  async find(params: {
    [key: string]: string | number | boolean;
  }): Promise<AddressInterface[]> {
    const results = await this.addressModel.find(params);

    return results.map(
      (address) =>
        new Address(
          address.name,
          address.addressLine1,
          address.addressLine2,
          address.zipcode,
          address.city,
          address.state,
          address.country,
          address.status,
          address._id.toString(),
        ),
    );
  }
  async get(id: string): Promise<AddressInterface | null> {
    const address = await this.addressModel.findById(id);
    if (!address)
      throw new NotFoundException(`Address with id: ${id} not found`);
    return new Address(
      address.name,
      address.addressLine1,
      address.addressLine2,
      address.zipcode,
      address.city,
      address.state,
      address.country,
      address.status,
      address.id,
    );
  }
  async getAll(): Promise<AddressInterface[]> {
    const results = await this.addressModel.find();

    return results.map(
      (address) =>
        new Address(
          address.name,
          address.addressLine1,
          address.addressLine2,
          address.zipcode,
          address.city,
          address.state,
          address.country,
          address.status,
          address.id,
        ),
    );
  }

  async createOrUpdate(item: AddressPrimitives): Promise<AddressInterface> {
    const { id, ...data } = item;
    const address = await this.addressModel.findById(id);
    if (address) {
      await address.updateOne(data);
      return new Address(
        address.name,
        address.addressLine1,
        address.addressLine2,
        address.zipcode,
        address.city,
        address.state,
        address.country,
        address.status,
        address.id,
      );
    }

    const result = await this.addressModel.create(item);

    result.save();

    return new Address(
      result.name,
      result.addressLine1,
      result.addressLine2,
      result.zipcode,
      result.city,
      result.state,
      result.country,
      result.status,
      result._id.toString(),
    );
  }

  async save(item: AddressPrimitives): Promise<AddressInterface> {
    const result = await this.addressModel.create(item);
    const address = await result.save();

    return new Address(
      address.name,
      address.addressLine1,
      address.addressLine2,
      address.zipcode,
      address.city,
      address.state,
      address.country,
      address.status,
      address._id.toString(),
    );
  }
  async update(item: Partial<AddressPrimitives>): Promise<boolean> {
    const { id, ...data } = item;
    const address = await this.addressModel.findById(id);

    if (!address)
      throw new NotFoundException(`Address with id: ${id} not found`);

    return Boolean((await address.updateOne(data)).modifiedCount);
  }
  async softDelete(id: string): Promise<boolean> {
    const address = await this.addressModel.findById(id);

    if (!address)
      throw new NotFoundException(`Address with id: ${id} not found`);

    return Boolean(
      (await address.updateOne({ status: 'DELETED' })).modifiedCount,
    );
  }
  async delete(id: string): Promise<boolean> {
    const address = await this.addressModel.findById(id);

    if (!address)
      throw new NotFoundException(`Address with id: ${id} not found`);

    return Boolean((await address.deleteOne()).deletedCount);
  }
}
