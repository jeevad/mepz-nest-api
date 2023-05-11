import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
// import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(username: string, plainTextPassword: string) {
    // mongoose.set('debug', true);
    try {
      const user = await this.usersService.getByUsername(username);

      await this.verifyPassword(plainTextPassword, user.password);
      const payload = { username: user.username, sub: user._id };
      const userData = user.toJSON();
      delete userData.password;
      return {
        userData,
        access_token: await this.jwtService.signAsync(payload),
      };
      return user;
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