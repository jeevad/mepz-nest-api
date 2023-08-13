import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, now } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';

export type ActivityLogDocument = ActivityLog & Document;

@Schema({
  autoIndex: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class ActivityLog {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ required: true })
  staffId: number;

  @Prop({ required: true })
  admin: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  valid: string;

  @Prop({ required: true })
  group: string;

  @Prop({ required: true })
  remarks: string;
}

const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);

// ActivityLogSchema.index({ userName: 'text' }, { unique: true });

export { ActivityLogSchema };
