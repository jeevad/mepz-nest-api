import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomsDocument = Rooms & Document;

@Schema({
  timestamps: true,
})
export class Rooms {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  floor: string;

  @Prop({ required: true })
  active: boolean;
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
