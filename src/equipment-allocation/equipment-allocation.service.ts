import { Injectable } from '@nestjs/common';
import { CreateEquipmentAllocationDto } from './dto/create-equipment-allocation.dto';
import { UpdateEquipmentAllocationDto } from './dto/update-equipment-allocation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { EquipmentAllocationDocument } from 'src/schemas/equipmentAllocation.schema';
import { EquipmentAllocation } from './entities/equipment-allocation.entity';

@Injectable()
export class EquipmentAllocationService {
  constructor(
    @InjectModel(EquipmentAllocation.name)
    private readonly EquipmentAllocationModel: Model<EquipmentAllocationDocument>,
  ) {}

  async create(
    createEquipmentAllocationDto: CreateEquipmentAllocationDto,
  ): Promise<EquipmentAllocationDocument> {
    const EquipmentAllocation = new this.EquipmentAllocationModel(
      createEquipmentAllocationDto,
    );
    return EquipmentAllocation.save();
  }

  // async findAll(): Promise<EquipmentAllocationDocument[]> {
  //   return this.EquipmentAllocationModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<EquipmentAllocationDocument> = startId
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

    const findQuery = this.EquipmentAllocationModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.EquipmentAllocationModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.EquipmentAllocationModel.findById(id);
  }

  async update(
    id: string,
    updateEquipmentAllocationDto: UpdateEquipmentAllocationDto,
  ): Promise<EquipmentAllocationDocument> {
    return this.EquipmentAllocationModel.findByIdAndUpdate(
      id,
      updateEquipmentAllocationDto,
    );
  }

  async remove(id: string) {
    return this.EquipmentAllocationModel.findByIdAndRemove(id);
  }
}
