import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserCondominiumInterface } from '@shared/domain/interfaces/userCondominium.interface';
import { User } from '@shared/domain/schemas/user.schema';
import { Condominium } from '@shared/domain/schemas/condominium.schema';

export type UserCondominiumDocument =
  HydratedDocument<UserCondominiumInterface>;

@Schema({ timestamps: true })
export class UserCondominium {
  @Prop()
  displayName: string;

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Condominium', required: true })
  condominium: Condominium;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const UserCondominiumSchema =
  SchemaFactory.createForClass(UserCondominium);
