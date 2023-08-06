import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentAllocationDocument = EquipmentAllocation & Document;

@Schema({
  timestamps: true,
})
export class EquipmentAllocation {
  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  equipment: string;

  @Prop({ required: true })
  apq: number;

  @Prop({ required: true })
  fpq: number;

  @Prop({ required: true })
  qty: number;
  
  @Prop({ required: true })
  cost: number;
  
  @Prop()
  active: boolean;
  
}

export const EquipmentAllocationSchema =
  SchemaFactory.createForClass(EquipmentAllocation);
