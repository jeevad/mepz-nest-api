import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import {
  EquipmentLabelSchema,
  EquipmentLabel,
} from './equipmentLabel.schema';
import {
  EquipmentPackageSchema,
  EquipmentPackage,
} from './equipmentPackage.schema';
import {
  EquipmentPowerSchema,
  EquipmentPower,
} from './equipmentPower.schema';

export type ProjectRoomEquipmentDocument = ProjectRoomEquipment & Document;

@Schema({
  timestamps: true,
})
export class ProjectRoomEquipment {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  equipmentId2: string;
  
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

  @Prop({ type: EquipmentPowerSchema })
  @Type(() => EquipmentPower)
  EquipmentPowerRequirement: EquipmentPower;

  @Prop({ type: EquipmentLabelSchema })
  @Type(() => EquipmentLabel)
  EquipmentLabel: EquipmentLabel;

  // @Prop({ required: true })
  // isDeleted: boolean;
}

export const ProjectRoomEquipmentSchema =
  SchemaFactory.createForClass(ProjectRoomEquipment);
