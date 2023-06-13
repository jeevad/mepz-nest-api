import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentSummaryDocument = EquipmentSummary & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class EquipmentSummary {
  @Prop({ required: true })
  num: number;

  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  equipment: string;

  @Prop({ required: true })
  package: string;

  @Prop({ required: true })
  fpq: number;

  @Prop({ required: true })
  apq: number;

  @Prop({ required: true })
  qty: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  markUp: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  group: string;

  @Prop({ required: true })
  utility: string;

  @Prop({ required: true })
  remarks: string;

  @Prop({ required: true })
  label: string;
}

export const EquipmentSummarySchema =
  SchemaFactory.createForClass(EquipmentSummary);
