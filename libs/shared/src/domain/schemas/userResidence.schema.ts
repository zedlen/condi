import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserResidenceInterface } from '@shared/domain/interfaces/userResidence.interface';
import { User } from '@shared/domain/schemas/user.schema';
import { Residence } from '@shared/domain/schemas/residence.schema';

export type UserResidenceDocument = HydratedDocument<UserResidenceInterface>;

@Schema({ timestamps: true })
export class UserResidence {
  @Prop()
  displayName: string;

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Residence', required: true, index: true })
  residence: Residence;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: User;
}

export const UserResidenceSchema = SchemaFactory.createForClass(UserResidence);
