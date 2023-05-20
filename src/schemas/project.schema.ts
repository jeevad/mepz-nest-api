import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectDepartment, ProjectDepartmentSchema } from './projectDepartment.schema';
import { Type } from 'class-transformer';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Project {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  projectname: string;

  @Prop({ required: true })
  fullProjectName: string;

  @Prop({ required: true })
  clientOwner: string;

  @Prop({ required: true })
  contractNo: string;

  @Prop({ required: true })
  noofBeds: string;

  @Prop({ required: true })
  classification: string;

  @Prop({ required: true })
  projecttype: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  signature1: string;

  @Prop({ required: true })
  signature2: string;

  @Prop({ type: ProjectDepartmentSchema })
  @Type(() => ProjectDepartment)
  departments: ProjectDepartment[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
