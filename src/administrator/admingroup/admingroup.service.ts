import { Injectable } from '@nestjs/common';
import { CreateAdmingroupDto } from './dto/create-admingroup.dto';
import { UpdateAdmingroupDto } from './dto/update-admingroup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { AdmingroupDocument } from 'src/schemas/admingroup.schema';
import { Admingroup } from './entities/admingroup.entity';

@Injectable()
export class AdmingroupService {
  constructor(
    @InjectModel(Admingroup.name)
    private readonly AdmingroupModel: Model<AdmingroupDocument>,
  ) {}

  async create(
    createAdmingroupDto: CreateAdmingroupDto,
  ): Promise<AdmingroupDocument> {
    const Admingroup = new this.AdmingroupModel(createAdmingroupDto);
    return Admingroup.save();
  }

  // async findAll(): Promise<AdmingroupDocument[]> {
  //   return this.AdmingroupModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<AdmingroupDocument> = startId
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

    const findQuery = this.AdmingroupModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.AdmingroupModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.AdmingroupModel.findById(id);
  }

  async update(
    id: string,
    updateAdmingroupDto: UpdateAdmingroupDto,
  ): Promise<AdmingroupDocument> {
    return this.AdmingroupModel.findByIdAndUpdate(id, updateAdmingroupDto);
  }

  async remove(id: string) {
    return this.AdmingroupModel.findByIdAndRemove(id);
  }
}
