import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentBrandDocument = EquipmentBrand & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class EquipmentBrand {
  @Prop({ required: true })
  SupplierName: string;

  @Prop({ required: true })
  Brand: string;

  @Prop({ required: true })
  Model: string;

  @Prop({ required: true })
  CountryofOrigin: string;

  @Prop({ required: true })
  UnitPrice: string;

  @Prop({ required: true })
  ContactPerson: string;

  @Prop({ required: true })
  TelMail: string;
}

export const EquipmentBrandSchema =
  SchemaFactory.createForClass(EquipmentBrand);
