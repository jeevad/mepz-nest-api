import { Injectable } from '@nestjs/common';
import { CreateEquipmentBrandDto } from './dto/create-equipment-brand.dto';
import { UpdateEquipmentBrandDto } from './dto/update-equipment-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { EquipmentBrandDocument } from 'src/schemas/equipmentBrand.schema';
import { EquipmentBrand } from './entities/equipment-brand.entity';

@Injectable()
export class EquipmentBrandService {
  constructor(
    @InjectModel(EquipmentBrand.name)
    private readonly EquipmentBrandModel: Model<EquipmentBrandDocument>,
  ) {}

  async create(
    createEquipmentBrandDto: CreateEquipmentBrandDto,
  ): Promise<EquipmentBrandDocument> {
    const EquipmentBrand = new this.EquipmentBrandModel(
      createEquipmentBrandDto,
    );
    return EquipmentBrand.save();
  }

  // async findAll(): Promise<EquipmentBrandDocument[]> {
  //   return this.EquipmentBrandModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<EquipmentBrandDocument> = startId
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

    const findQuery = this.EquipmentBrandModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.EquipmentBrandModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.EquipmentBrandModel.findById(id);
  }

  async update(
    id: string,
    updateEquipmentBrandDto: UpdateEquipmentBrandDto,
  ): Promise<EquipmentBrandDocument> {
    return this.EquipmentBrandModel.findByIdAndUpdate(
      id,
      updateEquipmentBrandDto,
    );
  }

  async remove(id: string) {
    return this.EquipmentBrandModel.findByIdAndRemove(id);
  }
}
