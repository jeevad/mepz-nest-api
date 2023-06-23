import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ProjectDepartment,
  ProjectDepartmentSchema,
} from './projectDepartment.schema';
import { Type } from 'class-transformer';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true,
})
export class Project {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  clientOwner: string;

  @Prop({ required: true })
  contractNo: string;

  @Prop({ required: true })
  noOfBeds: string;

  @Prop({ required: true })
  classification: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  signature1: string;

  @Prop({ required: true })
  signature2: string;

  // @Prop({ required: true })
  // isDeleted: boolean;

  @Prop({ type: [ProjectDepartmentSchema] })
  @Type(() => ProjectDepartment)
  departments: ProjectDepartment[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
