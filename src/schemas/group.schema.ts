import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Group {
  @Prop({ required: true })
  groupcode: string;

  @Prop({ required: true })
  groupname: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
