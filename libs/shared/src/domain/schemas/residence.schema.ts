import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ResidencePrimitives } from '@shared/domain/interfaces/residence.interface';
import { Condominium } from './condominium.schema';

export type ResidenceDocument = HydratedDocument<ResidencePrimitives>;

@Schema({ timestamps: true })
export class Residence {
  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  customIdentifier: string;

  @Prop()
  ownerStatus: number;

  @Prop()
  coOwnerStatus: number;

  @Prop({ type: Types.ObjectId, ref: 'Condominium', required: true })
  condominium: Condominium;
}

export const ResidenceSchema = SchemaFactory.createForClass(Residence);
