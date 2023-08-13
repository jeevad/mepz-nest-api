import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, now } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';

export type AccessLevelDocument = AccessLevel & Document;

@Schema({
  autoIndex: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class AccessLevel {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  projectId: string;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  admin: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  valid: string;

  @Prop({ required: true })
  group: string;
}

const AccessLevelSchema = SchemaFactory.createForClass(AccessLevel);

// AccessLevelSchema.index({ userName: 'text' }, { unique: true });

export { AccessLevelSchema };
