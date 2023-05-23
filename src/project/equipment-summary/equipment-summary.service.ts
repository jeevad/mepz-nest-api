import { Injectable } from '@nestjs/common';
import { CreateEquipmentSummaryDto } from './dto/create-equipment-summary.dto';
import { UpdateEquipmentSummaryDto } from './dto/update-equipment-summary.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { EquipmentSummaryDocument } from 'src/schemas/equipmentSummary.schema';
import { EquipmentSummary } from './entities/equipment-summary.entity';

@Injectable()
export class EquipmentSummaryService {
  constructor(
    @InjectModel(EquipmentSummary.name)
    private readonly EquipmentSummaryModel: Model<EquipmentSummaryDocument>,
  ) {}

  async create(
    createEquipmentSummaryDto: CreateEquipmentSummaryDto,
  ): Promise<EquipmentSummaryDocument> {
    const EquipmentSummary = new this.EquipmentSummaryModel(
      createEquipmentSummaryDto,
    );
    return EquipmentSummary.save();
  }

  // async findAll(): Promise<EquipmentSummaryDocument[]> {
  //   return this.EquipmentSummaryModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<EquipmentSummaryDocument> = startId
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

    const findQuery = this.EquipmentSummaryModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.EquipmentSummaryModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.EquipmentSummaryModel.findById(id);
  }

  async update(
    id: string,
    updateEquipmentSummaryDto: UpdateEquipmentSummaryDto,
  ): Promise<EquipmentSummaryDocument> {
    return this.EquipmentSummaryModel.findByIdAndUpdate(
      id,
      updateEquipmentSummaryDto,
    );
  }

  async remove(id: string) {
    return this.EquipmentSummaryModel.findByIdAndRemove(id);
  }
}
