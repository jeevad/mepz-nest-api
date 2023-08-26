import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { EquipmentLabelSchema, EquipmentLabel } from './equipmentLabel.schema';
import {
  EquipmentPackageSchema,
  EquipmentPackage,
} from './equipmentPackage.schema';
import { EquipmentPowerSchema, EquipmentPower } from './equipmentPower.schema';

export type ProjectEquipmentDocument = ProjectEquipment & Document;

@Schema({
  timestamps: true,
})
export class ProjectEquipment {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  equipmentId: string;
  @Prop()
  equipmentId: string;
  @Prop()
  projectId: string;
  @Prop()
  projectCode: string;
  @Prop()
  projectName: string;

  @Prop()
  departmentId: string;
  @Prop()
  departmentCode: string;
  @Prop()
  departmentName: string;

  @Prop()
  roomId: string;
  @Prop()
  roomCode: string;
  @Prop()
  roomName: string;

  @Prop()
  equipmentId4: string;

  @Prop()
  qty: number;

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
  cost: string;

  @Prop()
  active: boolean;

  @Prop()
  markUp: string;

  @Prop()
  heatDissipation: string;

  @Prop()
  ictPort: string;

  @Prop()
  bssPort: string;

  @Prop()
  utility: string;

  //@Prop({ required: true })
  @Prop()
  floor: string;

  @Prop()
  group: string;

  @Prop({ type: EquipmentPackageSchema })
  @Type(() => EquipmentPackage)
  EquipmentPackage: EquipmentPackage;

  @Prop({ type: EquipmentPowerSchema })
  @Type(() => EquipmentPower)
  EquipmentPowerRequirement: EquipmentPower;

  @Prop({ type: EquipmentLabelSchema })
  @Type(() => EquipmentLabel)
  EquipmentLabel: EquipmentLabel;

  // @Prop({ required: true })
  // isDeleted: boolean;
}

export const ProjectEquipmentSchema =
  SchemaFactory.createForClass(ProjectEquipment);
