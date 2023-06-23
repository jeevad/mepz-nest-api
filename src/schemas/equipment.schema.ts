import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  EquipmentPackage,
  EquipmentPackageSchema,
} from './equipmentPackage.schema';
import { Type } from 'class-transformer';
import {
  EquipmentPowerRequirementSchema,
  EquipmentPowerRequirement,
} from './equipmentPowerRequirement.schema';
import {
  EquipmentLabelUpdation,
  EquipmentLabelUpdationSchema,
} from './equipmentLabelUpdation.schema';

export type EquipmentDocument = Equipment & Document;

@Schema({
  timestamps: true,
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

  @Prop({ type: EquipmentPackageSchema })
  @Type(() => EquipmentPackage)
  EquipmentPackage: EquipmentPackage;

  @Prop({ type: EquipmentPowerRequirementSchema })
  @Type(() => EquipmentPowerRequirement)
  EquipmentPowerRequirement: EquipmentPowerRequirement;

  @Prop({ type: EquipmentLabelUpdationSchema })
  @Type(() => EquipmentLabelUpdation)
  EquipmentLabelUpdation: EquipmentLabelUpdation;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
