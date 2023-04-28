import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupDocument } from 'src/schemas/group.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';



@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly GroupModel: Model<GroupDocument>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<GroupDocument> {
    const Group = new this.GroupModel(createGroupDto);
    return Group.save();
  }

  // async findAll(): Promise<GroupDocument[]> {
  //   return this.GroupModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<GroupDocument> = startId
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

    const findQuery = this.GroupModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.GroupModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.GroupModel.findById(id);
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<GroupDocument> {
    return this.GroupModel.findByIdAndUpdate(id, updateGroupDto);
  }

  async remove(id: string) {
    return this.GroupModel.findByIdAndRemove(id);
  }
}
