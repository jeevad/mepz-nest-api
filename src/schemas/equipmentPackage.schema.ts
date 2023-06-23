import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type EquipmentPackageDocument = EquipmentPackage & Document;

@Schema()
export class EquipmentPackage {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  package: string;

  @Prop()
  remarks: string;
}

export const EquipmentPackageSchema =
  SchemaFactory.createForClass(EquipmentPackage);
