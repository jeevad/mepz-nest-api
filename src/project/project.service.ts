import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { AddProjectDepartmentDto } from './dto/add-project-department.dto';
import { AddProjectDepartmentRoomDto } from './dto/add-project-department-room.dto';
import { AddProjectRoomEquipmentDto } from './dto/add-project-room-equipment.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly ProjectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    const Project = new this.ProjectModel(createProjectDto);
    return Project.save();
  }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
  ) {
    const filters: FilterQuery<ProjectDocument> = startId
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

    const findQuery = this.ProjectModel.find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.ProjectModel.count();

    return { results, count };
  }

  findOne(id: string) {
    return this.ProjectModel.findById(id);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    return this.ProjectModel.findByIdAndUpdate(id, updateProjectDto);
  }

  async remove(id: string) {
    return this.ProjectModel.findByIdAndRemove(id);
  }

  async addDepartment(
    projectId: string,
    addProjectDepartmentDto: AddProjectDepartmentDto,
  ): Promise<any> {
    return this.ProjectModel.updateOne(
      { _id: projectId },
      { $push: { departments: addProjectDepartmentDto } },
    );
  }

  async addRoom(
    projectId: string,
    departmentId: string,
    addProjectDepartmentRoomDto: AddProjectDepartmentRoomDto,
  ): Promise<any> {
    return this.ProjectModel.updateOne(
      { _id: projectId, 'departments._id': departmentId },
      { $push: { 'departments.$.rooms': addProjectDepartmentRoomDto } },
    );
  }

  async addRoomEquipment(
    projectId: string,
    departmentId: string,
    roomId: string,
    addProjectRoomEquipmentDto: AddProjectRoomEquipmentDto,
  ): Promise<any> {
    return this.ProjectModel.updateOne(
      {
        _id: projectId,
        'departments._id': departmentId,
      },
      {
        $push: {
          'departments.$.rooms.$[j].equipments': addProjectRoomEquipmentDto,
        },
      },
      {
        arrayFilters: [
          {
            'j._id': roomId,
          },
        ],
      },
    );
  }
}
