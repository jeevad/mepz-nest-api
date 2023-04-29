import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Department {
  @Prop({ required: true })
  departmentcode: string;

  @Prop({ required: true })
  departmentname: string;

  @Prop({ required: true })
  active: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
