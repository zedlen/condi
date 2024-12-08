import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AddressPrimitives } from '@shared/domain/interfaces/address.interface';

export type AddressDocument = HydratedDocument<AddressPrimitives>;

@Schema({ timestamps: true })
export class Address {
  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  zipcode: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  status: string;

  @Prop()
  name: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
