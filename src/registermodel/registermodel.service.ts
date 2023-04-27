import { Injectable } from '@nestjs/common';
import { CreateRegistermodelDto } from './dto/create-registermodel.dto';
import { UpdateRegistermodelDto } from './dto/update-registermodel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { RegistermodelDocument } from 'src/schemas/registermodel.schema';
import { Registermodel } from './entities/registermodel.entity';

@Injectable()
export class RegistermodelService {
  constructor(
    @InjectModel(Registermodel.name)
    private readonly RegistermodelModel: Model<RegistermodelDocument>,
  ) {}

  async create(
    createRegistermodelDto: CreateRegistermodelDto,
  ): Promise<RegistermodelDocument> {
    const Registermodel = new this.RegistermodelModel(createRegistermodelDto);
    return Registermodel.save();
  }

  // async findAll(): Promise<RegistermodelDocument[]> {
  //   return this.RegistermodelModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<RegistermodelDocument> = startId
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

    const findQuery = this.RegistermodelModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.RegistermodelModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.RegistermodelModel.findById(id);
  }

  async update(
    id: string,
    updateRegistermodelDto: UpdateRegistermodelDto,
  ): Promise<RegistermodelDocument> {
    return this.RegistermodelModel.findByIdAndUpdate(
      id,
      updateRegistermodelDto,
    );
  }

  async remove(id: string) {
    return this.RegistermodelModel.findByIdAndRemove(id);
  }
}
