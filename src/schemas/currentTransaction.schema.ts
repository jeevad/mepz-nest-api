import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrentTransactionDocument = CurrentTransaction & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class CurrentTransaction {
  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  alias: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  action: string;
}

export const CurrentTransactionSchema =
  SchemaFactory.createForClass(CurrentTransaction);
