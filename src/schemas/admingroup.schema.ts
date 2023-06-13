import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdmingroupDocument = Admingroup & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Admingroup {
  @Prop({ required: true })
  name: string;
}

export const AdmingroupSchema = SchemaFactory.createForClass(Admingroup);
