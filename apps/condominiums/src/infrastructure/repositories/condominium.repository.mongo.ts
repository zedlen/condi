import { Condominium } from '@condominiums/domain/entities/condominium.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CondominiumEntity as CondominiumInterface } from '@shared/domain/entities/Condominium.entity';
import { Condominium as CondominiumModel } from '@shared/domain/schemas/condominium.schema';
import { CondominiumRepository as CondominiumRepositoryInterface } from '@condominiums/domain/interfaces/condominium.repository.interface';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CondominiumPrimitives } from '@shared/domain/interfaces/condominium.interface';

export class CondominiumRepository implements CondominiumRepositoryInterface {
  constructor(
    @InjectModel(CondominiumModel.name)
    private condominiumModel: Model<CondominiumModel>,
  ) {}

  async find(params: {
    [key: string]: string | number | boolean;
  }): Promise<CondominiumInterface[]> {
    const results = await this.condominiumModel
      .find(params)
      .populate('address');

    return results.map(
      (condominium) =>
        new Condominium(
          condominium.name,
          condominium.status,
          condominium.address,
          condominium.type,
          condominium.totalResidences,
          condominium.avialableParkingSpots,
          condominium.externalId,
          condominium._id.toString(),
        ),
    );
  }
  async get(id: string): Promise<CondominiumInterface | null> {
    const condominium = await this.condominiumModel
      .findById(id)
      .populate('address');
    if (!condominium)
      throw new NotFoundException(`Condominium with id: ${id} not found`);
    return new Condominium(
      condominium.name,
      condominium.status,
      condominium.address,
      condominium.type,
      condominium.totalResidences,
      condominium.avialableParkingSpots,
      condominium.externalId,
      condominium._id.toString(),
    );
  }
  async getAll(): Promise<CondominiumInterface[]> {
    const results = await this.condominiumModel.find().populate('address');
    return results.map(
      (condominium) =>
        new Condominium(
          condominium.name,
          condominium.status,
          condominium.address,
          condominium.type,
          condominium.totalResidences,
          condominium.avialableParkingSpots,
          condominium.externalId,
          condominium._id.toString(),
        ),
    );
  }

  async createOrUpdate(
    item: CondominiumPrimitives,
  ): Promise<CondominiumInterface> {
    const { id, address, ...data } = item;
    const condominium = await this.condominiumModel
      .findById(id)
      .populate('address');

    if (condominium) {
      await condominium.updateOne({
        ...data,
        address: new Types.ObjectId(address.id),
      });
      return new Condominium(
        condominium.name,
        condominium.status,
        address,
        condominium.type,
        condominium.totalResidences,
        condominium.avialableParkingSpots,
        condominium.externalId,
        condominium._id.toString(),
      );
    }

    const result = await this.condominiumModel.create({
      ...data,
      address: new Types.ObjectId(address.id),
    });
    result.save();
    return new Condominium(
      result.name,
      result.status,
      address,
      result.type,
      result.totalResidences,
      result.avialableParkingSpots,
      result.externalId,
      result._id.toString(),
    );
  }

  async save(item: CondominiumPrimitives): Promise<CondominiumInterface> {
    const result = await this.condominiumModel.create(item);
    const condominium = await result.save();

    return new Condominium(
      condominium.name,
      condominium.status,
      condominium.address,
      condominium.type,
      condominium.totalResidences,
      condominium.avialableParkingSpots,
      condominium.externalId,
      condominium._id.toString(),
    );
  }
  async update(item: Partial<CondominiumPrimitives>): Promise<boolean> {
    const { id, ...data } = item;
    const condominium = await this.condominiumModel.findById(id);

    if (!condominium)
      throw new NotFoundException(`Condominium with id: ${id} not found`);

    return Boolean((await condominium.updateOne(data)).modifiedCount);
  }
  async softDelete(id: string): Promise<boolean> {
    const condominium = await this.condominiumModel.findById(id);

    if (!condominium)
      throw new NotFoundException(`Condominium with id: ${id} not found`);

    return Boolean(
      (await condominium.updateOne({ status: 'DELETED' })).modifiedCount,
    );
  }
  async delete(id: string): Promise<boolean> {
    const condominium = await this.condominiumModel.findById(id);

    if (!condominium)
      throw new NotFoundException(`Condominium with id: ${id} not found`);

    return Boolean((await condominium.deleteOne()).deletedCount);
  }
}
