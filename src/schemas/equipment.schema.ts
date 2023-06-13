import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentDocument = Equipment & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Equipment {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cost: string;

  @Prop({ required: true })
  markUp: string;

  @Prop({ required: true })
  heatDissipation: string;

  @Prop({ required: true })
  ictPort: string;

  @Prop({ required: true })
  bssPort: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
