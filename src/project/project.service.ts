import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, FilterQuery } from 'mongoose';
import { AddProjectDepartmentDto } from './dto/add-project-department.dto';
import { AddProjectDepartmentRoomDto } from './dto/add-project-department-room.dto';
import { AddProjectRoomEquipmentDto } from './dto/add-project-room-equipment.dto';
import { UpdateProjectFieldDto } from './dto/update-project-field.dto';
import { PaginationParams } from 'src/utils/paginationParams';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';

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

  async updateDepartment(
    projectId: string,
    updateProjectFieldDto: UpdateProjectFieldDto,
  ): Promise<any> {
    mongoose.set('debug', true);

    let match: any = { _id: projectId };
    let update = {};
    let arrFilter: any = [];
    switch (updateProjectFieldDto.type) {
      case 'department':
        update = {
          [`departments.$[i].${updateProjectFieldDto.field}`]:
            updateProjectFieldDto.value,
        };
        arrFilter[0] = {
          'i._id': updateProjectFieldDto.departmentId,
        };
        break;
      case 'room':
        match = {
          ...match,
          'departments._id': updateProjectFieldDto.departmentId,
        };
        update = {
          [`departments.$.rooms.$[j].${updateProjectFieldDto.field}`]:
            updateProjectFieldDto.value,
        };
        arrFilter = [
          // { 'i._id': updateProjectFieldDto.departmentId },
          { 'j._id': updateProjectFieldDto.roomId },
        ];
        break;
      case 'equipment':
        update = {
          [`departments.$[i].rooms.$[j].equipments.${updateProjectFieldDto.equipmentIndex}.${updateProjectFieldDto.field}`]:
            updateProjectFieldDto.value,
        };
        arrFilter = [
          { 'i._id': updateProjectFieldDto.departmentId },
          { 'j._id': updateProjectFieldDto.roomId },
        ];
        break;
    }
    // console.log('update', update);
    // return false;

    const res = await this.ProjectModel.updateOne(
      match,
      {
        $set: update,
      },
      {
        arrayFilters: arrFilter,
      },
    );
    return res;
  }

  async deleteDepartment(
    projectId: string,
    departmentId: string,
    field: string,
    value: string,
  ): Promise<any> {
    // mongoose.set('debug', true);

    const res = await this.ProjectModel.findOneAndUpdate(
      {
        _id: projectId,
      },
      // { $pull: { "models.$[e1].reviews": { _id: req.params._id } } },
      // {
      //   arrayFilters: [
      //     { "e1.name": req.params.model },
      //     { "e2._id": req.params._id },
      //   ],
      // }
    );

    return res;
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
    // const results1 = await this.ProjectModel.findById(projectId).select(
    //   'name departments',
    // );

    const results = await this.ProjectModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
      {
        $project: {
          name: 1,
          code: 1,
          departments: {
            $map: {
              input: '$departments',
              as: 'dept',
              in: {
                _id: '$$dept._id',
                deparmtentId: '$$dept.departmentId',
                name: '$$dept.name',
                code: '$$dept.code',
                alias: '$$dept.alias',
                level: '$$dept.level',
              },
            },
          },
        },
      },
    ]);
    return { results };
  }

  //Get Rooms by projectID
  async getRooms(projectId: string, deptId: string) {
    // mongoose.set('debug', true);
    const pipeline: any = [
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
      {
        $project: {
          name: 1,
          code: 1,
          departments: 1,
        },
      },
      { $unwind: '$departments' },
    ];
    if (deptId) {
      pipeline.push({
        $match: {
          'departments._id': new mongoose.Types.ObjectId(deptId),
        },
      });
    }
    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }

  //Get Equipments by projectID
  async getEquipments(projectId: string, deptId: string, roomId: string) {
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
      {
        $project: {
          name: 1,
          code: 1,
          departments: 1,
        },
      },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      {
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(roomId),
        },
      },
    ];
    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }

  //Get Equipments by projectID
  async getProjectEquipments(
    projectId: string,
    paginationParams: PaginationParams,
  ) {
    const pipeline: any = [
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
      {
        $project: {
          name: 1,
          code: 1,
          departments: 1,
        },
      },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      {
        $unwind: {
          path: '$departments.rooms.equipments',
          includeArrayIndex: 'arrayIndex',
        },
      },
      // { $sort: { 'departments.rooms.equipments.name': -1 } },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 3 } }],
          data: [
            { $skip: paginationParams.skip },
            { $limit: paginationParams.limit },
          ], // add projection here wish you re-shape the docs
        },
      },
    ];
    // if (roomId) {
    //   pipeline.push({
    //     $match: {
    //       'departments.rooms._id': new mongoose.Types.ObjectId(roomId),
    //     },
    //   });
    // }
    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }

  //Get Departments by projectID
  async getAllDepartments(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams: PaginationParams,
  ) {
    const projectId = filterEquipmentDto.projectId.map((item) => {
      return new mongoose.Types.ObjectId(item);
    });

    const results = await this.ProjectModel.aggregate([
      { $match: { _id: { $in: projectId } } },
      {
        $project: {
          name: 1,
          code: 1,
          departments: {
            $map: {
              input: '$departments',
              as: 'dept',
              in: {
                _id: '$$dept._id',
                deparmtentId: '$$dept.departmentId',
                name: '$$dept.name',
                code: '$$dept.code',
                alias: '$$dept.alias',
                level: '$$dept.level',
              },
            },
          },
        },
      },
    ]);
    return { results };
  }

  //Get Rooms by projectID
  async getAllRooms(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams: PaginationParams,
  ) {
    // mongoose.set('debug', true);
    const projectId = filterEquipmentDto.projectId.map((item) => {
      return new mongoose.Types.ObjectId(item);
    });
    const pipeline: any = [
      { $match: { _id: { $in: projectId } } },
      {
        $project: {
          name: 1,
          code: 1,
          departments: 1,
        },
      },
      { $unwind: '$departments' },
    ];
    if (filterEquipmentDto.departmentId) {
      pipeline.push({
        $match: {
          'departments._id': new mongoose.Types.ObjectId(
            filterEquipmentDto.departmentId,
          ),
        },
      });
    }
    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }
  //Get Equipments by projectID
  async getAllEquipments(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams: PaginationParams,
  ) {
    mongoose.set('debug', true);
    const projectId = filterEquipmentDto.projectId.map((item) => {
      return new mongoose.Types.ObjectId(item);
    });
    let pipeline: any = [
      {
        $match: {
          _id: { $in: projectId },
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          departments: 1,
        },
      },
      { $unwind: '$departments' },

      // { $sort: { 'departments.rooms.equipments.name': -1 } },
    ];

    if (filterEquipmentDto.departmentId) {
      pipeline.push({
        $match: {
          'departments._id': new mongoose.Types.ObjectId(
            filterEquipmentDto.departmentId,
          ),
        },
      });
    }
    pipeline = [...pipeline, { $unwind: '$departments.rooms' }];
    if (filterEquipmentDto.roomId) {
      pipeline.push({
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(
            filterEquipmentDto.roomId,
          ),
        },
      });
    }

    pipeline = [
      ...pipeline,
      { $unwind: '$departments.rooms.equipments' },
      {
        $group: {
          _id: '$departments.rooms.equipments.equipmentId',
          code: { $first: '$departments.rooms.equipments.code' },
          name: { $first: '$departments.rooms.equipments.name' },
        },
      },
    ];

    if (filterEquipmentDto.searchInput) {
      pipeline.push({
        $match: {
          $or: [
            {
              code: filterEquipmentDto.searchInput,
            },
            {
              name: filterEquipmentDto.searchInput,
            },
          ],
        },
      });
    }
    pipeline = [
      ...pipeline,
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [
            { $skip: paginationParams.skip },
            { $limit: paginationParams.limit },
          ], // add projection here wish you re-shape the docs
        },
      },
    ];

    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }
  async getAllEquipments_bkp(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams: PaginationParams,
  ) {
    mongoose.set('debug', true);
    const projectId = filterEquipmentDto.projectId.map((item) => {
      return new mongoose.Types.ObjectId(item);
    });
    const pipeline: any = [
      {
        $match: {
          _id: { $in: projectId },
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          departments: 1,
        },
      },
      { $unwind: '$departments' },
      {
        $match: {
          'departments._id': new mongoose.Types.ObjectId(
            filterEquipmentDto.departmentId,
          ),
        },
      },
      { $unwind: '$departments.rooms' },
      {
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(
            filterEquipmentDto.roomId,
          ),
        },
      },
      {
        $unwind: {
          path: '$departments.rooms.equipments',
          includeArrayIndex: 'arrayIndex',
        },
      },
      {
        $group: {
          _id: '$departments.rooms.equipments.equipmentId',
          // equipments: { $addToSet: '$departments.rooms.equipments' },
          code: { $first: '$departments.rooms.equipments.code' },
          name: { $first: '$departments.rooms.equipments.name' },
        },
      },
      {
        $match: {
          $or: [
            {
              code: filterEquipmentDto.searchInput,
            },
            {
              name: filterEquipmentDto.searchInput,
            },
          ],
        },
      },
      // { $sort: { 'departments.rooms.equipments.name': -1 } },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [
            { $skip: paginationParams.skip },
            { $limit: paginationParams.limit },
          ], // add projection here wish you re-shape the docs
        },
      },
    ];

    if (filterEquipmentDto.departmentId) {
      pipeline.push({
        $match: {
          'departments._id': new mongoose.Types.ObjectId(
            filterEquipmentDto.departmentId,
          ),
        },
      });
    }

    if (filterEquipmentDto.roomId) {
      pipeline.push({
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(
            filterEquipmentDto.roomId,
          ),
        },
      });
    }

    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
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
