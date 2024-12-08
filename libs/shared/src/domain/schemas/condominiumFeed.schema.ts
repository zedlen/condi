import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CondominiumFeedPrimitives } from '@shared/domain/interfaces/condominiumFeed.interface';
import { HydratedDocument } from 'mongoose';

export type CondominiumFeedDocument =
  HydratedDocument<CondominiumFeedPrimitives>;

@Schema({ timestamps: true })
export class CondominiumFeed {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ index: true, required: true })
  condominiumId: string;

  @Prop()
  status: string;
}

export const CondominiumFeedSchema =
  SchemaFactory.createForClass(CondominiumFeed);
