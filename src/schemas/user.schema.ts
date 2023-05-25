import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, now } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Address, AddressSchema } from './address.schema';
// import { Address, AddressSchema } from 'address.schema';
// import { Post } from '../posts/post.schema';

export type UserDocument = User & Document;

@Schema({
  autoIndex: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User {
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

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop({ required: true })
  @Exclude()
  reEnterPassword: string;

  // @Prop({ unique: true })
  // email: string;

  // @Prop()
  // firstName: string;

  // @Prop()
  // lastName: string;

  // fullName: string;

  // @Prop()
  // @Exclude()
  // password: string;

  // @Prop({ type: AddressSchema })
  // @Type(() => Address)
  // address: Address;

  // @Prop({
  //   get: (creditCardNumber: string) => {
  //     if (!creditCardNumber) {
  //       return;
  //     }
  //     const lastFourDigits = creditCardNumber.slice(
  //       creditCardNumber.length - 4,
  //     );
  //     return `****-****-****-${lastFourDigits}`;
  //   },
  // })
  // creditCardNumber?: string;

  // @Type(() => Post)
  // posts: Post[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ userName: 'text' }, { unique: true });

// UserSchema.virtual('fullName').get(function (this: User) {
//   return `${this.firstName} ${this.lastName}`;
// });

// UserSchema.virtual('posts', {
//   ref: 'Post',
//   localField: '_id',
//   foreignField: 'author',
// });

export { UserSchema };
