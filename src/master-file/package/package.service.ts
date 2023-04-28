import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package, PackageDocument } from 'src/schemas/package.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name) private readonly PackageModel: Model<PackageDocument>,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<PackageDocument> {
    const Package = new this.PackageModel(createPackageDto);
    return Package.save();
  }

  // async findAll(): Promise<PackageDocument[]> {
  //   return this.PackageModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<PackageDocument> = startId
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

    const findQuery = this.PackageModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.PackageModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.PackageModel.findById(id);
  }

  async update(
    id: string,
    updatePackageDto: UpdatePackageDto,
  ): Promise<PackageDocument> {
    return this.PackageModel.findByIdAndUpdate(id, updatePackageDto);
  }

  async remove(id: string) {
    return this.PackageModel.findByIdAndRemove(id);
  }
}
