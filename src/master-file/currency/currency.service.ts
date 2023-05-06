import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Currency, CurrencyDocument } from 'src/schemas/currency.schema';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name)
    private readonly CurrencyModel: Model<CurrencyDocument>,
  ) {}

  async create(
    createCurrencyDto: CreateCurrencyDto,
  ): Promise<CurrencyDocument> {
    const Currency = new this.CurrencyModel(createCurrencyDto);
    return Currency.save();
  }

  // async findAll(): Promise<CurrencyDocument[]> {
  //   return this.CurrencyModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<CurrencyDocument> = startId
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

    const findQuery = this.CurrencyModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.CurrencyModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.CurrencyModel.findById(id);
  }

  async update(
    id: string,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyDocument> {
    return this.CurrencyModel.findByIdAndUpdate(id, updateCurrencyDto);
  }

  async remove(id: string) {
    return this.CurrencyModel.findByIdAndRemove(id);
  }
}
