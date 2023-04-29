import { Injectable } from '@nestjs/common';
import { CreatePastTransactionDto } from './dto/create-past-transaction.dto';
import { UpdatePastTransactionDto } from './dto/update-past-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  PastTransaction,
  PastTransactionDocument,
} from 'src/schemas/pastTransaction.schema';

@Injectable()
export class PastTransactionService {
  constructor(
    @InjectModel(PastTransaction.name)
    private readonly PastTransactionModel: Model<PastTransactionDocument>,
  ) {}

  async create(
    createPastTransactionDto: CreatePastTransactionDto,
  ): Promise<PastTransactionDocument> {
    const PastTransaction = new this.PastTransactionModel(
      createPastTransactionDto,
    );
    return PastTransaction.save();
  }

  // async findAll(): Promise<PastTransactionDocument[]> {
  //   return this.PastTransactionModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<PastTransactionDocument> = startId
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

    const findQuery = this.PastTransactionModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.PastTransactionModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.PastTransactionModel.findById(id);
  }

  async update(
    id: string,
    updatePastTransactionDto: UpdatePastTransactionDto,
  ): Promise<PastTransactionDocument> {
    return this.PastTransactionModel.findByIdAndUpdate(
      id,
      updatePastTransactionDto,
    );
  }

  async remove(id: string) {
    return this.PastTransactionModel.findByIdAndRemove(id);
  }
}
