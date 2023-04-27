import { Injectable } from '@nestjs/common';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
import {
  Classification,
  ClassificationDocument,
} from 'src/schemas/classification.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectModel(Classification.name)
    private readonly ClassificationModel: Model<ClassificationDocument>,
  ) {}

  async create(
    createClassificationDto: CreateClassificationDto,
  ): Promise<ClassificationDocument> {
    const Classification = new this.ClassificationModel(
      createClassificationDto,
    );
    return Classification.save();
  }

  // async findAll(): Promise<ClassificationDocument[]> {
  //   return this.ClassificationModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<ClassificationDocument> = startId
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

    const findQuery = this.ClassificationModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.ClassificationModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.ClassificationModel.findById(id);
  }

  async update(
    id: string,
    updateClassificationDto: UpdateClassificationDto,
  ): Promise<ClassificationDocument> {
    return this.ClassificationModel.findByIdAndUpdate(
      id,
      updateClassificationDto,
    );
  }

  async remove(id: string) {
    return this.ClassificationModel.findByIdAndRemove(id);
  }
}
