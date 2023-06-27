import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';


export type EquipmentPackageDocument = EquipmentPackage & Document;

@Schema()
export class EquipmentPackage {

  @Prop()
  package: string;

  @Prop()
  packageRemarks: string;
}

export const EquipmentPackageSchema =
  SchemaFactory.createForClass(EquipmentPackage);
