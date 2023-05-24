import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import mongoose, { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async getByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getByUsername(userName: string) {
    const user = await this.userModel.findOne({ userName });
    if (!user) {
      throw new NotFoundException('User not exists');
    }
    return user;
  }

  async findOne(id: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not exists');
    }

    return user;
  }

  async create_bkp(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    // await createdUser
    //   .populate({
    //     path: 'posts',
    //     populate: {
    //       path: 'categories',
    //     },
    //   })
    //   .execPopulate();
    return createdUser.save();
  }

  public async create(userData: CreateUserDto) {
    // confirm password
    if (userData.password !== userData.reEnterPassword) {
      throw new BadRequestException(
        'Password and Re-Enter Password not matched',
      );
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await this.checkUnique({ userName: userData.userName }, 'userName'); //check unique userName
    await this.checkUnique({ staffId: userData.staffId }, 'staffId'); //check unique staffId

    try {
      return await this.userModel.create({
        ...userData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.response) {
        throw new HttpException(error?.response, error?.status);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkUnique(userData, field) {
    const isUnique = await this.userModel.findOne(userData);
    if (isUnique) {
      throw new BadRequestException(`User with ${field} already exists`);
    }
  }

  async delete(userId: string) {
    const session = await this.connection.startSession();

    session.startTransaction();
    try {
      const user = await this.userModel
        .findByIdAndDelete(userId)
        // .populate('posts')
        .session(session);

      if (!user) {
        throw new NotFoundException();
      }
      // const posts = user.posts;

      // await this.postsService.deleteMany(
      //   posts.map((post) => post._id.toString()),
      //   session,
      // );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<UserDocument> = startId
      ? {
        _id: {
          $gt: startId,
        },
      }
      : {};

    // if (searchQuery) {
    //   filters.$text = {
    //     $search: searchQuery,
    //   };
    // }

    const findQuery = this.userModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.userModel.count();

    return { results, count };
  }

  async update(
    id: string,
    updateUsermodelDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUsermodelDto);
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
