import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UtilityDocument = Utility & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Utility {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export const UtilitySchema = SchemaFactory.createForClass(Utility);
