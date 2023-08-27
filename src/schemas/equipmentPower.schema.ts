import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type EquipmentPowerDocument = EquipmentPower &
  Document;

@Schema()
export class EquipmentPower {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  heatDissipationPower: string;

  @Prop()
  data: string;

  @Prop()
  bss: string;

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
  typicalWeight: string;

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
  powerRemarks: string;
}

export const EquipmentPowerSchema = SchemaFactory.createForClass(
  EquipmentPower,
);
