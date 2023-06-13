import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import {
  ProjectDepartmentRoom,
  ProjectDepartmentRoomSchema,
} from './projectDepartmentRoom.schema';

export type ProjectDepartmentDocument = ProjectDepartment & Document;

@Schema({
  timestamps: true,
})
export class ProjectDepartment {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  departmentId: string;
  
  @Prop()
  name: string;

  // @Prop()
  // alias: string;

  @Prop()
  code: string;

  // @Prop()
  // active: boolean;

  @Prop({ type: [ProjectDepartmentRoomSchema] })
  @Type(() => ProjectDepartmentRoom)
  rooms: ProjectDepartmentRoom[];
}

export const ProjectDepartmentSchema =
  SchemaFactory.createForClass(ProjectDepartment);
