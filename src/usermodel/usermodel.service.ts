import { Injectable } from '@nestjs/common';
import { CreateUsermodelDto } from './dto/create-usermodel.dto';
import { UpdateUsermodelDto } from './dto/update-usermodel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { UsermodelDocument } from 'src/schemas/usermodel.schema';
import { Usermodel } from './entities/usermodel.entity';

@Injectable()
export class UsermodelService {
  constructor(
    @InjectModel(Usermodel.name)
    private readonly UsermodelModel: Model<UsermodelDocument>,
  ) {}

  async create(
    createUsermodelDto: CreateUsermodelDto,
  ): Promise<UsermodelDocument> {
    const Usermodel = new this.UsermodelModel(createUsermodelDto);
    return Usermodel.save();
  }

  // async findAll(): Promise<UsermodelDocument[]> {
  //   return this.UsermodelModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<UsermodelDocument> = startId
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

    const findQuery = this.UsermodelModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.UsermodelModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.UsermodelModel.findById(id);
  }

  async update(
    id: string,
    updateUsermodelDto: UpdateUsermodelDto,
  ): Promise<UsermodelDocument> {
    return this.UsermodelModel.findByIdAndUpdate(id, updateUsermodelDto);
  }

  async remove(id: string) {
    return this.UsermodelModel.findByIdAndRemove(id);
  }
}
