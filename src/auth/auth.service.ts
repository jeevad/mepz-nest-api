import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ActivityLogsService } from 'src/administrator/activity-logs/activity-logs.service';
import { UserEntity } from 'src/administrator/users/entities/user.entity';
import { UsersService } from 'src/administrator/users/users.service';
// import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private logModel: ActivityLogsService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, plainTextPassword: string) {
    // mongoose.set('debug', true);
    try {
      const user = await this.usersService.getByUsername(userName);

      await this.verifyPassword(plainTextPassword, user.password);
      const payload = { userName: user.userName, id: user._id };

      const logInfo: any = {
        // url: 'auth/login',
        // method: 'post',
        action: 'Logged in',
        user,
        // request,
      };
      this.logModel.create(logInfo);

      return {
        user: new UserEntity(user.toJSON()),
        jwtToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new BadRequestException(error?.response?.message);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }
}
