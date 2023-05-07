import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentAllocationDocument = EquipmentAllocation & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class EquipmentAllocation {
  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  equipment: string;

  @Prop({ required: true })
  apq: string;

  @Prop({ required: true })
  fpq: string;

  @Prop({ required: true })
  qty: string;
}

export const EquipmentAllocationSchema =
  SchemaFactory.createForClass(EquipmentAllocation);
