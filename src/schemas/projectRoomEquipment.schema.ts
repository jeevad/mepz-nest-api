import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

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

  // @Prop({ required: true })
  // isDeleted: boolean;

}

export const ProjectRoomEquipmentSchema =
  SchemaFactory.createForClass(ProjectRoomEquipment);
