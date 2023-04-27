import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { UpdateRoomsDto } from './dto/update-rooms.dto';
import { Rooms, RoomsDocument } from 'src/schemas/rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Rooms.name) private readonly RoomsModel: Model<RoomsDocument>,
  ) {}

  async create(createRoomsDto: CreateRoomsDto): Promise<RoomsDocument> {
    const Rooms = new this.RoomsModel(createRoomsDto);
    return Rooms.save();
  }

  // async findAll(): Promise<RoomsDocument[]> {
  //   return this.RoomsModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<RoomsDocument> = startId
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

    const findQuery = this.RoomsModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.RoomsModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.RoomsModel.findById(id);
  }

  async update(
    id: string,
    updateRoomsDto: UpdateRoomsDto,
  ): Promise<RoomsDocument> {
    return this.RoomsModel.findByIdAndUpdate(id, updateRoomsDto);
  }

  async remove(id: string) {
    return this.RoomsModel.findByIdAndRemove(id);
  }
}
