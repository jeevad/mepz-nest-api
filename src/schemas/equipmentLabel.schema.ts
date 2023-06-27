import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type EquipmentLabelDocument = EquipmentLabel & Document;

@Schema()
export class EquipmentLabel {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  equipmentCode: string;

  @Prop()
  equipmentName: string;

  @Prop()
  label: string;
}

export const EquipmentLabelSchema =
  SchemaFactory.createForClass(EquipmentLabel);
