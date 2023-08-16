import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Mixed, ObjectId, now } from 'mongoose';
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

  @Prop()
  url: string;

  @Prop()
  action: string;

  // @Prop({ required: true })
  // request: Mixed;

  // @Prop({ required: true })
  // response: {
  //   messageType: string;
  //   timestamp: number;
  //   messagestatus: string;
  // };

  @Prop(raw({}))
  requestData: Record<string, any>;

  @Prop(raw({}))
  pageName: string;

  @Prop(raw({}))
  method: string;

  @Prop(
    raw({
      _id: { type: String },
      userName: { type: String },
    }),
  )
  user: Record<string, any>;
  // @Prop(
  //   raw({
  //     status: { type: String },
  //     lastName: { type: String },
  //   }),
  // )
  // response: Record<string, any>;
}

const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);

// ActivityLogSchema.index({ userName: 'text' }, { unique: true });

export { ActivityLogSchema };
