import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Company {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  inactive: boolean; 
  
  @Prop({ required: true })
  address1: string;

  @Prop({ required: true })
  address2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  postal: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  logo1: string;

  @Prop({ required: true })
  show1: boolean;

  @Prop({ required: true })
  logo2: string;

  @Prop({ required: true })
  show2: boolean;

  @Prop({ required: true })
  logo3: string;

  @Prop({ required: true })
  show3: boolean;

  @Prop({ required: true })
  contact: number;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  mobile: number;

  @Prop({ required: true })
  fax: string;

  @Prop({ required: true })
  email: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
