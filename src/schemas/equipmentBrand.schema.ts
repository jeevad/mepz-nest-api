import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EquipmentBrandDocument = EquipmentBrand & Document;

@Schema({
  timestamps: true,
})
export class EquipmentBrand {
  //@Prop({ required: true })
  @Prop()
  name: string;

  //@Prop({ required: true })
  @Prop()
  brand: string;

  //@Prop({ required: true })
  @Prop()
  model: string;

 // @Prop({ required: true })
  @Prop()
  countryOfOrigin: string;

  //@Prop({ required: true })
  @Prop()
  unitPrice: number;

  //@Prop({ required: true })
  @Prop()
  contactPerson: string;

  //@Prop({ required: true })
  @Prop()
  email: string;
}

export const EquipmentBrandSchema =
  SchemaFactory.createForClass(EquipmentBrand);
