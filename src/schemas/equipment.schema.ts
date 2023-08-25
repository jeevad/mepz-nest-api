import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EquipmentPackage,
  EquipmentPackageSchema,
} from './equipmentPackage.schema';
import { Type } from 'class-transformer';
import {
  EquipmentPowerSchema,
  EquipmentPower,
} from './equipmentPower.schema';
import {
  EquipmentLabel,
  EquipmentLabelSchema,
} from './equipmentLabel.schema';
import {
  EquipmentBrand,
  EquipmentBrandSchema,
} from './equipmentBrand.schema';
import { ApiProperty } from '@nestjs/swagger';

export type EquipmentDocument = Equipment & Document;

@Schema({
  timestamps: true,
})
export class Equipment {

  @Prop()
  fileOne: string;

  @Prop()
  fileTwo: string;

  @Prop()
  fileThree: string;
  
  @Prop()
  qty: number;
  
  @Prop({ required: true })
  code: string;

  //@Prop({ required: true })
  @Prop()
  name: string;

  @Prop({ required: true })
  cost: string;
  
  @Prop()
  active: boolean;
  
  //@Prop({ required: true })
  @Prop()
  markUp: string;

  //@Prop({ required: true })
  @Prop()
  heatDissipation: string;

 // @Prop({ required: true })
  @Prop()
  ictPort: string;

 // @Prop({ required: true })
  @Prop()
  bssPort: string;

  @Prop()
  remarks: string;
  
  @Prop()
  utility: string; 
  
  @Prop()
  labels: string;
  
  @Prop({ type: EquipmentPackageSchema })
  @Type(() => EquipmentPackage)
  equipmentPackage: EquipmentPackage; 

  @Prop({ type: EquipmentPowerSchema })
  @Type(() => EquipmentPower)
  equipmentPower: EquipmentPower; 

  @Prop({ type: EquipmentLabelSchema })
  @Type(() => EquipmentLabel)
  equipmentLabel: EquipmentLabel; 

  @Prop({ type: [EquipmentBrandSchema] })
  @Type(() => EquipmentBrand)
  brands: EquipmentBrand[];

}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
