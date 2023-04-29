import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  contractNo: number;

  @Prop({ required: true })
  noofBeds: number;

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
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
