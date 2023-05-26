import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentBrandDocument = EquipmentBrand & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class EquipmentBrand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  countryOfOrigin: string;

  @Prop({ required: true })
  unitPrice: string;

  @Prop({ required: true })
  contactPerson: string;

  @Prop({ required: true })
  email: string;
}

export const EquipmentBrandSchema =
  SchemaFactory.createForClass(EquipmentBrand);
