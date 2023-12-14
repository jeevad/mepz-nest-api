import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { EquipmentLabelSchema, EquipmentLabel } from './equipmentLabel.schema';
import {
  EquipmentPackageSchema,
  EquipmentPackage,
} from './equipmentPackage.schema';
import { EquipmentPowerSchema, EquipmentPower } from './equipmentPower.schema';

export type ProjectEquipmentDocument = ProjectEquipment & Document;

const commonFields = {
  code: { type: String },
  name: { type: String },
  masterId: { type: String },
  active: { type: Boolean },
};

@Schema({
  autoIndex: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class ProjectEquipment {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  masterId: string;

  @Prop(raw({ ...commonFields, projectId: { type: String } }))
  project: Record<string, any>;

  @Prop(raw({ ...commonFields, projectDepartmentId: { type: String } }))
  department: Record<string, any>;

  @Prop(
    raw({
      ...commonFields,
      projectRoomId: { type: String },
      mysqlRoomId: { type: Number },
    }),
  )
  room: Record<string, any>;

  @Prop(
    raw({
      _id: { type: String },
      userName: { type: String },
    }),
  )
  user: Record<string, any>;

  // @Prop()
  // projectId: string;
  // @Prop()
  // projectCode: string;
  // @Prop()
  // projectName: string;

  // @Prop()
  // departmentId: string;
  // @Prop()
  // departmentCode: string;
  // @Prop()
  // departmentName: string;

  // @Prop()
  // departmentActive: boolean;

  // @Prop()
  // roomId: string;

  // @Prop()
  // roomNo: string;

  // @Prop()
  // roomCode: string;
  // @Prop()
  // roomName: string;
  // @Prop()
  // roomActive: boolean;

  @Prop()
  equipmentId4: string;

  @Prop()
  markup_per: string;

  @Prop()
  markUp: string;

  @Prop()
  markupPer: string; // TODO: verify the field

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
  cost: number;

  @Prop()
  active: boolean;

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

  @Prop()
  eq_group: string;

  @Prop()
  specs: string;

  @Prop(raw({}))
  brands: Record<string, any>;

  @Prop(raw({}))
  labels: Record<string, any>;

  @Prop()
  remarks: string; // TODO: verify the field

  @Prop(raw({}))
  package: Record<string, any>;

  @Prop({ type: EquipmentPackageSchema })
  @Type(() => EquipmentPackage)
  equipmentPackage: EquipmentPackage;

  @Prop({ type: EquipmentPowerSchema })
  @Type(() => EquipmentPower)
  equipmentPowerRequirement: EquipmentPower;

  @Prop({ type: EquipmentLabelSchema })
  @Type(() => EquipmentLabel)
  equipmentLabel: EquipmentLabel;

  // @Prop(raw({}))
  // tac: string;

  @Prop(raw({}))
  tender_qty: number;

  @Prop(raw({}))
  room_data_interaction: Record<string, any>;

  @Prop(raw({}))
  four_wall_interaction: Record<string, any>;

  @Prop(raw({}))
  model: Record<string, any>;

  @Prop(raw({}))
  country_of_origin: Record<string, any>;

  @Prop(raw({}))
  equipment_planning_procure_planning_remarks: Record<string, any>;

  @Prop(raw({}))
  manufacturer: Record<string, any>;

  @Prop(raw({}))
  supplier_firm: Record<string, any>;

  @Prop(raw({}))
  contact_person: Record<string, any>;

  @Prop(raw({}))
  tel_email: Record<string, any>;

  @Prop(raw({}))
  site_facility_visit: Record<string, any>;

  @Prop(raw({}))
  site_facility_confirm: Record<string, any>;

  @Prop(raw({}))
  est_delivery: Date;

  @Prop(raw({}))
  delivery_actual: Date;

  @Prop(raw({}))
  returns: Record<string, any>;

  @Prop(raw({}))
  payment: Record<string, any>;

  @Prop(raw({}))
  location_store: Record<string, any>;

  @Prop(raw({}))
  internal_testing_est: Date;

  @Prop(raw({}))
  internal_testing_actual: Date;

  @Prop(raw({}))
  thirdparty_testing_est: Date;

  @Prop(raw({}))
  validation_remarks: Record<string, any>;

  @Prop(raw({}))
  final_testing_client_est: Date;

  @Prop(raw({}))
  final_testing_client_actual: Date;

  @Prop(raw({}))
  room_ins_1_est: Date;

  @Prop(raw({}))
  room_ins_1_actual: Date;

  @Prop(raw({}))
  room_ins_2_est: Date;

  @Prop(raw({}))
  room_ins_2_actual: Date;

  @Prop(raw({}))
  handover_est: Date;

  @Prop(raw({}))
  handover_actual: Date;

  // @Prop({ required: true })
  // isDeleted: boolean;
}

export const ProjectEquipmentSchema =
  SchemaFactory.createForClass(ProjectEquipment);
