import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsermodelDocument = Usermodel & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Usermodel {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  staffid: number;

  @Prop({ required: true })
  admin: boolean;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  valid: string;

  @Prop({ required: true })
  remarks: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  reEnterPassword: string;
}

export const UsermodelSchema = SchemaFactory.createForClass(Usermodel);
