import { Injectable } from '@nestjs/common';
import { CreateProjecttemplateDto } from './dto/create-projecttemplate.dto';
import { UpdateProjecttemplateDto } from './dto/update-projecttemplate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  Projecttemplate,
  ProjecttemplateDocument,
} from 'src/schemas/projecttemplate.schema';

@Injectable()
export class ProjecttemplateService {
  constructor(
    @InjectModel(Projecttemplate.name)
    private readonly ProjecttemplateModel: Model<ProjecttemplateDocument>,
  ) {}

  async create(
    createProjecttemplateDto: CreateProjecttemplateDto,
  ): Promise<ProjecttemplateDocument> {
    const Projecttemplate = new this.ProjecttemplateModel(
      createProjecttemplateDto,
    );
    return Projecttemplate.save();
  }

  // async findAll(): Promise<ProjecttemplateDocument[]> {
  //   return this.ProjecttemplateModel.find();
  // }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<ProjecttemplateDocument> = startId
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

    const findQuery = this.ProjecttemplateModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.ProjecttemplateModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.ProjecttemplateModel.findById(id);
  }

  async update(
    id: string,
    updateProjecttemplateDto: UpdateProjecttemplateDto,
  ): Promise<ProjecttemplateDocument> {
    return this.ProjecttemplateModel.findByIdAndUpdate(
      id,
      updateProjecttemplateDto,
    );
  }

  async remove(id: string) {
    return this.ProjecttemplateModel.findByIdAndRemove(id);
  }
}
