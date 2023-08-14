import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdmingroupDocument = Admingroup & Document;

@Schema({
  timestamps: true,
})
export class Admingroup {
  @Prop({ required: true })
  name: string;

  @Prop()
  formatAccess: string[];
}

export const AdmingroupSchema = SchemaFactory.createForClass(Admingroup);
