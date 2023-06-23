import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import {
  EquipmentLabelUpdationSchema,
  EquipmentLabelUpdation,
} from './equipmentLabelUpdation.schema';
import {
  EquipmentPackageSchema,
  EquipmentPackage,
} from './equipmentPackage.schema';
import {
  EquipmentPowerRequirementSchema,
  EquipmentPowerRequirement,
} from './equipmentPowerRequirement.schema';

export type ProjectRoomEquipmentDocument = ProjectRoomEquipment & Document;

@Schema({
  timestamps: true,
})
export class ProjectRoomEquipment {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  equipmentId: string;

  @Prop()
  name: string;

  // @Prop()
  // alias: string;

  @Prop()
  code: string;

  @Prop()
  apq: number;

  @Prop()
  fpq: number;

  @Prop()
  quantity: number;

  @Prop()
  cost: string;

  @Prop()
  markUp: string;

  @Prop()
  heatDissipation: string;

  @Prop()
  ictPort: string;

  @Prop()
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

  // @Prop({ required: true })
  // isDeleted: boolean;
}

export const ProjectRoomEquipmentSchema =
  SchemaFactory.createForClass(ProjectRoomEquipment);
