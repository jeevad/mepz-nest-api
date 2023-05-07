import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentDocument = Equipment & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Equipment {
  @Prop({ required: true })
  equipmentCode: string;

  @Prop({ required: true })
  equipmentName: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  markUp: number;

  @Prop({ required: true })
  heatDissipation: string;

  @Prop({ required: true })
  ictPort: string;

  @Prop({ required: true })
  bssPort: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);