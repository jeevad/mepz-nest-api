import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomsDocument = Rooms & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Rooms {
  @Prop({ required: true })
  roomcode: string;

  @Prop({ required: true })
  roomname: string;

  @Prop({ required: true })
  active: string;
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
