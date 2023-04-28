import { Injectable } from '@nestjs/common';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { Utility, UtilityDocument } from 'src/schemas/utility.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UtilityService {
  constructor(
    @InjectModel(Utility.name) private readonly UtilityModel: Model<UtilityDocument>,
  ) {}

  async create(createUtilityDto: CreateUtilityDto): Promise<UtilityDocument> {
    const Utility = new this.UtilityModel(createUtilityDto);
    return Utility.save();
  }

  // async findAll(): Promise<UtilityDocument[]> {
  //   return this.UtilityModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<UtilityDocument> = startId
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

    const findQuery = this.UtilityModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.UtilityModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.UtilityModel.findById(id);
  }

  async update(
    id: string,
    updateUtilityDto: UpdateUtilityDto,
  ): Promise<UtilityDocument> {
    return this.UtilityModel.findByIdAndUpdate(id, updateUtilityDto);
  }

  async remove(id: string) {
    return this.UtilityModel.findByIdAndRemove(id);
  }
}
