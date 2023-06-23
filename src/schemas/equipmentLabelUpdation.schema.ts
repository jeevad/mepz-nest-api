import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type EEquipmentLabelUpdationDocument = EquipmentLabelUpdation & Document;

@Schema()
export class EquipmentLabelUpdation {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  equipmentCode: string;

  @Prop()
  equipmentName: string;

  @Prop()
  label: string;
}

export const EquipmentLabelUpdationSchema = SchemaFactory.createForClass(
  EquipmentLabelUpdation,
);
