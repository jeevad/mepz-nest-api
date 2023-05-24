import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserEntity {
  _id: string;
  userName: string;
  staffId: number;
  admin: string;
  active: string;
  group: string;
  valid: string;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
  reEnterPassword: string;


  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
