import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjecttemplateDocument = Projecttemplate & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Projecttemplate {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  noofbeds: number;

  @Prop({ required: true })
  classification: string;

  @Prop({ required: true })
  projecttype: string;

  @Prop({ required: true })
  remarks: string;
}

export const ProjecttemplateSchema =
  SchemaFactory.createForClass(Projecttemplate);
