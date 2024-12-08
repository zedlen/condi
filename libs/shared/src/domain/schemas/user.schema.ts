import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserPrimitives } from '@shared/domain/interfaces/user.interface';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserPrimitives>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  status: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop({ unique: true, index: true })
  externalId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
