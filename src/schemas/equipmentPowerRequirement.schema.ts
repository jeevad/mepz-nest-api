import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type EquipmentPowerRequirementDocument = EquipmentPowerRequirement &
  Document;

@Schema()
export class EquipmentPowerRequirement {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  heatDissipation: string;

  @Prop()
  data: string;

  @Prop()
  bss: string;

  @Prop()
  group: string;

  @Prop()
  typicalPowerConsumption: string;

  @Prop()
  typeOfPower: string;

  @Prop()
  waterInlet: string;

  @Prop()
  drainage: string;

  @Prop()
  ventilationExhaust: string;

  @Prop()
  medicalGas: string;

  @Prop()
  typicalWeight: number;

  @Prop()
  typicalFloorLoading: string;

  @Prop()
  typicalCeilingLoading: string;

  @Prop()
  radiationShielding: string;

  @Prop()
  corridorClearance: string;

  @Prop()
  controlRoom: string;

  @Prop()
  techRoom: string;

  @Prop()
  chiller: string;

  @Prop()
  fileOne: string;

  @Prop()
  fileTwo: string;

  @Prop()
  fileThree: string;

  @Prop()
  powerRequirementRemarks: string;
}

export const EquipmentPowerRequirementSchema = SchemaFactory.createForClass(
  EquipmentPowerRequirement,
);
