import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackageDocument = Package & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Package {
  @Prop({ required: true })
  packagecode: string;

  @Prop({ required: true })
  packagename: string;

  @Prop({ required: true })
  active: string;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
