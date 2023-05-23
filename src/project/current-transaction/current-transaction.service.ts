import { Injectable } from '@nestjs/common';
import { CreateCurrentTransactionDto } from './dto/create-current-transaction.dto';
import { UpdateCurrentTransactionDto } from './dto/update-current-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  CurrentTransaction,
  CurrentTransactionDocument,
} from 'src/schemas/currentTransaction.schema';

@Injectable()
export class CurrentTransactionService {
  constructor(
    @InjectModel(CurrentTransaction.name)
    private readonly CurrentTransactionModel: Model<CurrentTransactionDocument>,
  ) {}

  async create(
    createCurrentTransactionDto: CreateCurrentTransactionDto,
  ): Promise<CurrentTransactionDocument> {
    const CurrentTransaction = new this.CurrentTransactionModel(
      createCurrentTransactionDto,
    );
    return CurrentTransaction.save();
  }

  // async findAll(): Promise<CurrentTransactionDocument[]> {
  //   return this.CurrentTransactionModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<CurrentTransactionDocument> = startId
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

    const findQuery = this.CurrentTransactionModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.CurrentTransactionModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.CurrentTransactionModel.findById(id);
  }

  async update(
    id: string,
    updateCurrentTransactionDto: UpdateCurrentTransactionDto,
  ): Promise<CurrentTransactionDocument> {
    return this.CurrentTransactionModel.findByIdAndUpdate(
      id,
      updateCurrentTransactionDto,
    );
  }

  async remove(id: string) {
    return this.CurrentTransactionModel.findByIdAndRemove(id);
  }
}
