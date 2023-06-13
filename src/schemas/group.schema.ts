import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Group {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
