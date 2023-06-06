import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, FilterQuery } from 'mongoose';
import { AddProjectDepartmentDto } from './dto/add-project-department.dto';
import { AddProjectDepartmentRoomDto } from './dto/add-project-department-room.dto';
import { AddProjectRoomEquipmentDto } from './dto/add-project-room-equipment.dto';

@Injectable()
export class ProjectService {
  ProjectDepartmentModel: any;
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
    mongoose.set('debug', true);
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
    addProjectDepartmentDtos: AddProjectDepartmentDto[], // [] added
  ): Promise<any> {
    // return this.ProjectModel.findOneAndUpdate(  // Old
    return this.ProjectModel.findOneAndUpdate(
      // Line Changes
      { _id: projectId },
      // { $push: { departments: addProjectDepartmentDto } },  // Old
      { $addToSet: { departments: { $each: addProjectDepartmentDtos } } }, //Line Changes
    );
  }

  //Old
  // getDepartments(id: string) {
  //   // mongoose.set('debug', true);
  //   return this.ProjectModel.findById(id).select({ name: 1, _id: 0 });
  // }

  //Get Departments by projectID
  async getDepartments(
    projectId: string,
    skip: number,
    limit: number,
    startId: string,
    searchQuery: string,
  ) {
    const project = await this.ProjectModel.findById(projectId).select(
      'departments',
    );

    if (!project) {
      return null;
    }

    return {
      departments: project.departments,
    };
  }

  //Get Rooms by projectID
  async getRooms(projectId: string) {
    const project = await this.ProjectModel.findById(projectId)
      .select('departments.rooms')
      .populate('departments.rooms.equipments', 'name code');

    if (!project) {
      return null;
    }

    const departments = project.departments || [];
    const rooms = departments.reduce((result, department) => {
      return result.concat(department.rooms || []);
    }, []);

    return {
      rooms: rooms.map((room) => ({
        name: room.name,
        code: room.code,
        equipments: room.equipments || [],
      })),
    };
  }

  //Get Equipments by projectID
  async getEquipments(projectId: string) {
    const project = await this.ProjectModel.findById(projectId)
      .select('departments.rooms.equipments')
      .populate('departments.rooms.equipments', 'name code');

    if (!project) {
      return null;
    }

    const departments = project.departments || [];
    const equipments = departments.reduce((result, department) => {
      const rooms = department.rooms || [];
      return result.concat(rooms.flatMap((room) => room.equipments || []));
    }, []);

    return {
      equipments: equipments.map((equipment) => ({
        name: equipment.name,
        code: equipment.code,
      })),
    };
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
