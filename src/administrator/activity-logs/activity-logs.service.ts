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
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectModel(ActivityLog.name)
    private readonly activityLogModel: Model<ActivityLogDocument>,
    private readonly cls: ClsService,
  ) {}
  create(createActivityLogDto: any) {
    const activityLog = new this.activityLogModel(createActivityLogDto);
    return activityLog.save();
  }

  logAction(action: string, requestData: any = '') {
    const user = this.cls.get('user');
    const log = { action, user, requestData };
    console.log('log', log);

    this.create(log);
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
