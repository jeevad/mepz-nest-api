import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { EquipmentDocument } from 'src/schemas/equipment.schema';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private readonly EquipmentModel: Model<EquipmentDocument>,
  ) { }

  //Create
  async create(
    createEquipmentDto: CreateEquipmentDto,
  ): Promise<EquipmentDocument> {
    // createEquipmentDto.fileOne = createEquipmentDto.filePath; 
    const Equipment = new this.EquipmentModel(createEquipmentDto);
    // createEquipmentDto.fileOne = createEquipmentDto.filePath; // new line
    return Equipment.save();
  }

  // async findAll(): Promise<EquipmentDocument[]> {
  //   return this.EquipmentModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<EquipmentDocument> = startId
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

    const findQuery = this.EquipmentModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.EquipmentModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.EquipmentModel.findById(id);
  }

  async update(
    id: string,
    updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<EquipmentDocument> {
    //newly added if
    // if (updateEquipmentDto.filePath) {
    //   updateEquipmentDto.fileOne = updateEquipmentDto.filePath;
    // }

    return this.EquipmentModel.findByIdAndUpdate(id, updateEquipmentDto);
  }

  async remove(id: string) {
    return this.EquipmentModel.findByIdAndRemove(id);
  }

}
