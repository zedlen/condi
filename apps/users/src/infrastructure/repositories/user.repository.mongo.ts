import { User } from '@users/domain/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity as UserInterface } from '@shared/domain/entities/User.entity';
import { User as UserModel } from '@shared/domain/schemas/user.schema';
import { UserRepository as UserRepositoryInterface } from '@users/domain/interfaces/user.repository.interface';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserPrimitives } from '@shared/domain/interfaces/user.interface';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async find(params: {
    [key: string]: string | number | boolean;
  }): Promise<UserInterface[]> {
    const results = await this.userModel.find(params);

    return results.map(
      (user) =>
        new User(
          user.name,
          user.lastName,
          user.status,
          user.email,
          [],
          [],
          [],
          user.externalId,
          user._id.toString(),
        ),
    );
  }
  async get(id: string): Promise<UserInterface | null> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return new User(
      user.name,
      user.lastName,
      user.status,
      user.email,
      [],
      [],
      [],
      user.externalId,
      user._id.toString(),
    );
  }
  async getAll(): Promise<UserInterface[]> {
    const results = await this.userModel.find();

    return results.map(
      (user) =>
        new User(
          user.name,
          user.lastName,
          user.status,
          user.email,
          [],
          [],
          [],
          user.externalId,
          user._id.toString(),
        ),
    );
  }

  async createOrUpdate(item: UserPrimitives): Promise<UserInterface> {
    const { id, ...data } = item;
    const user = await this.userModel.findById(id);

    if (user) {
      await user.updateOne(data);
      return new User(
        user.name,
        user.lastName,
        user.status,
        user.email,
        [],
        [],
        [],
        user.externalId,
        user._id.toString(),
      );
    }

    const result = await this.userModel.create(item);
    result.save();
    return new User(
      result.name,
      result.lastName,
      result.status,
      result.email,
      [],
      [],
      [],
      result.externalId,
      result._id.toString(),
    );
  }

  async save(item: UserPrimitives): Promise<UserInterface> {
    const result = await this.userModel.create(item);
    const user = await result.save();

    return new User(
      user.name,
      user.lastName,
      user.status,
      user.email,
      [],
      [],
      [],
      user.externalId,
      user._id.toString(),
    );
  }
  async update(item: Partial<UserPrimitives>): Promise<boolean> {
    const { id, ...data } = item;
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    return Boolean((await user.updateOne(data)).modifiedCount);
  }
  async softDelete(id: string): Promise<boolean> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    return Boolean((await user.updateOne({ status: 'DELETED' })).modifiedCount);
  }
  async delete(id: string): Promise<boolean> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    return Boolean((await user.deleteOne()).deletedCount);
  }
}
