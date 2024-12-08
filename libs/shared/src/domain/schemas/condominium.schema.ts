import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CondominiumPrimitives } from '@shared/domain/interfaces/condominium.interface';
import { HydratedDocument, Types } from 'mongoose';
import { Address } from '@shared/domain/schemas/address.schema';

export type CondominiumDocument = HydratedDocument<CondominiumPrimitives>;

@Schema({ timestamps: true })
export class Condominium {
  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop({ unique: true, index: true })
  externalId: string;

  @Prop()
  type: string;

  @Prop()
  totalResidences: number;

  @Prop()
  avialableParkingSpots: number;

  @Prop({ type: Types.ObjectId, ref: 'Address', required: true })
  address: Address;
}

export const CondominiumSchema = SchemaFactory.createForClass(Condominium);
