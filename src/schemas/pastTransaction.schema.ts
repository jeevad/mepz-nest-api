import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PastTransactionDocument = PastTransaction & Document;

@Schema({
  timestamps: true,
})
export class PastTransaction {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  revision: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  action: string;
}

export const PastTransactionSchema =
  SchemaFactory.createForClass(PastTransaction);
