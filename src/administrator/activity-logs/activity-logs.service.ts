import { Injectable } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import {
  ActivityLog,
  ActivityLogDocument,
} from 'src/schemas/activityLog.schem';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PaginationParams } from 'src/utils/paginationParams';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectModel(ActivityLog.name)
    private readonly activityLogModel: Model<ActivityLogDocument>,
  ) {}
  create(createActivityLogDto: CreateActivityLogDto) {
    const activityLog = new this.activityLogModel(createActivityLogDto);
    return activityLog.save();
  }

  async findAll(paginationParams: PaginationParams) {
    const filters: FilterQuery<ActivityLogDocument> = paginationParams.startId
      ? {
          _id: {
            $gt: paginationParams.startId,
          },
        }
      : {};

    // if (searchQuery) {
    //   filters.$text = {
    //     $search: searchQuery,
    //   };
    // }

    const findQuery = this.activityLogModel
      .find(filters)
      .sort({ _id: -1 })
      .skip(paginationParams.skip);

    if (paginationParams.limit) {
      findQuery.limit(paginationParams.limit);
    }

    const results = await findQuery;
    const count = await this.activityLogModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.activityLogModel.findById(id);
  }

  async update(
    id: string,
    updateaAtivityLogDto: UpdateActivityLogDto,
  ): Promise<ActivityLogDocument> {
    return this.activityLogModel.findByIdAndUpdate(id, updateaAtivityLogDto);
  }

  async remove(id: string) {
    return this.activityLogModel.findByIdAndRemove(id);
  }
}
