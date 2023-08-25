import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: true,
})
export class Company {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  //@Prop({ required: true })
  @Prop()
  inactive: boolean;

 // @Prop({ required: true })
  @Prop()
  address1: string;

  //@Prop({ required: true })
  @Prop()
  address2: string;

  //@Prop({ required: true })
  @Prop()
  city: string;

  //@Prop({ required: true })
  @Prop()
  state: string;

 // @Prop({ required: true })
  @Prop()
  postal: string;

  //@Prop({ required: true })
  @Prop()
  country: string;

  //@Prop({ required: true })
  @Prop()
  logo1: string;

  @Prop({ required: true })
  logo2: string;

  @Prop({ required: true })
  logo3: string;

  //@Prop({ required: true })
  @Prop()
  show1: boolean;

  //@Prop({ required: true })
  @Prop()
  show2: boolean;

  //@Prop({ required: true })
  @Prop()
  show3: boolean;

  //@Prop({ required: true })
  @Prop()
  contact: string;
  //contact: number;

 // @Prop({ required: true })
  @Prop()
  phone: string;
  //phone: number;

  //@Prop({ required: true })
  @Prop()
  mobile: string;
  //mobile: number;

  //@Prop({ required: true })
  @Prop()
  fax: string;

 // @Prop({ required: true })
  @Prop()
  email: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
