import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserEntity {
  _id: string;
  username: string;
  staffid: number;
  admin: boolean;
  active: boolean;
  group: string;
  valid: string;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
