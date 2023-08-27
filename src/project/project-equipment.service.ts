import { Inject, Injectable, Req, Scope } from '@nestjs/common';
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
import { FilterReportDto } from 'src/reports/dto/filter-report.dto';
import { ActivityLogsService } from 'src/administrator/activity-logs/activity-logs.service';
import { ClsService } from 'nestjs-cls';
import {
  ProjectEquipment,
  ProjectEquipmentDocument,
} from 'src/schemas/projectEquipment.schema';

@Injectable()
export class ProjectEquipmentService {
  ProjectDepartmentModel: any;
  user: any;
  constructor(
    @InjectModel(Project.name)
    private readonly ProjectModel: Model<ProjectDocument>,
    @InjectModel(ProjectEquipment.name)
    private readonly projectEquipmentModel: Model<ProjectEquipmentDocument>,
    private logModel: ActivityLogsService, // @Inject('CurrentContext') private context: CurrentContext
  ) {}

  async createt(createProjectEquipmentDto: any): Promise<ProjectEquipment> {
    // console.log('log', logInfo);
    this.logModel.logAction(`Added equipments`, createProjectEquipmentDto);
    const project = new this.projectEquipmentModel(createProjectEquipmentDto);
    return project.save();
  }

  async createProjectEquipment(
    createProjectEquipmentDto: any,
  ): Promise<ProjectEquipment> {
    // console.log('log', logInfo);
    this.logModel.logAction(`Added equipments`, createProjectEquipmentDto);
    const Project = new this.projectEquipmentModel(createProjectEquipmentDto);
    return Project.save();
  }

  async findAll(projectId, paginationParams: PaginationParams) {
    // mongoose.set('debug', true);
    const filters: FilterQuery<ProjectDocument> = { projectId };

    if (paginationParams.searchQuery) {
      filters.$text = { $search: paginationParams.searchQuery };
    }

    const findQuery = this.projectEquipmentModel
      .find(filters)
      // .select({ departments: 0 })
      .sort({ _id: -1 })
      .skip(paginationParams.skip);

    if (paginationParams.limit) {
      findQuery.limit(paginationParams.limit);
    }

    const results = await findQuery;
    const count = await this.projectEquipmentModel.count(filters);

    this.logModel.logAction('Viewed projectEquipmentModel list page');

    return { results, count };
  }

  findOne(id: string) {
    // mongoose.set('debug', true);
    return this.ProjectModel.findById(id);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    this.logModel.logAction(`Updated project ID ${id}`, updateProjectDto);
    return this.ProjectModel.findByIdAndUpdate(id, updateProjectDto);
  }

  async remove(id: string) {
    return this.ProjectModel.findByIdAndRemove(id);
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
  async getProjectEquipmentsbyroom(
    projectId: string,
    roomId: string,
    equipmentId: string,
  ) {
    mongoose.set('debug', true);
    //let projectId = [];

    //projectId = [new mongoose.Types.ObjectId(projectId)];

    let pipeline: any = [
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
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

    pipeline = [...pipeline, { $unwind: '$departments.rooms' }];
    if (roomId) {
      pipeline.push({
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(roomId),
        },
      });
    }

    pipeline = [
      ...pipeline,
      { $unwind: '$departments.rooms.equipments' },
      // {
      //   $group: {
      //     _id: '$departments.rooms.equipments.equipmentId',
      //     code: { $first: '$departments.rooms.equipments.code' },
      //     name: { $first: '$departments.rooms.equipments.name' },
      //     room_code: { $first: '$departments.rooms.code' },
      //     room_name: { $first: '$departments.rooms.name' },
      //   },
      // },
    ];

    pipeline.push({
      $match: {
        'departments.rooms.equipments.code': equipmentId,
      },
    });
    pipeline = [
      ...pipeline,
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [
            {
              $project: {
                _id: '$departments.rooms.equipments.equipmentId',
                code: '$departments.rooms.equipments.code',
                name: '$departments.rooms.equipments.name',
                quantity: '$departments.rooms.equipments.quantity',
                room_code: '$departments.rooms.code',
                room_name: '$departments.rooms.name',
                department_code: '$departments.code',
                department_name: '$departments.name',
              },
            },
          ], // add projection here wish you re-shape the docs
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
    let projectId = [];
    if (Array.isArray(filterEquipmentDto.projectId)) {
      projectId = filterEquipmentDto.projectId.map((item) => {
        return new mongoose.Types.ObjectId(item);
      });
    } else {
      projectId = [new mongoose.Types.ObjectId(filterEquipmentDto.projectId)];
    }

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
  async getRoomDetail(projectId, roomId) {
    const pipeline: any = [
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      {
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(roomId),
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          'departments.code': '$departments.code',
          'departments.name': '$departments.name',
          'departments._id': '$departments._id',
          'departments.departmentId': '$departments.departmentId',
          'departments.rooms.code': '$departments.rooms.code',
          'departments.rooms.name': '$departments.rooms.name',
          'departments.rooms._id': '$departments.rooms._id',
          'departments.rooms.roomId': '$departments.rooms.roomId',
        },
      },
    ];
    const results = await this.ProjectModel.aggregate(pipeline);
    return results;
  }
  //Get Equipments by projectID
  async getAllEquipments(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams?: PaginationParams,
  ) {
    mongoose.set('debug', true);
    let projectId = [];
    if (Array.isArray(filterEquipmentDto.projectId)) {
      projectId = filterEquipmentDto.projectId.map((item) => {
        return new mongoose.Types.ObjectId(item);
      });
    } else {
      projectId = [new mongoose.Types.ObjectId(filterEquipmentDto.projectId)];
    }

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
      // {
      //   $group: {
      //     _id: '$departments.rooms.equipments.equipmentId',
      //     code: { $first: '$departments.rooms.equipments.code' },
      //     name: { $first: '$departments.rooms.equipments.name' },
      //     room_code: { $first: '$departments.rooms.code' },
      //     room_name: { $first: '$departments.rooms.name' },
      //   },
      // },
    ];

    if (filterEquipmentDto.searchInput) {
      pipeline.push({
        $match: {
          $or: [
            {
              'departments.rooms.equipments.code': {
                $regex: new RegExp(filterEquipmentDto.searchInput, 'i'),
              },
            },
            {
              'departments.rooms.equipments.name': {
                $regex: new RegExp(filterEquipmentDto.searchInput, 'i'),
              },
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
            {
              $project: {
                _id: '$departments.rooms.equipments.equipmentId',
                code: '$departments.rooms.equipments.code',
                name: '$departments.rooms.equipments.name',
                quantity: '$departments.rooms.equipments.quantity',
                room_code: '$departments.rooms.code',
                room_name: '$departments.rooms.name',
                department_code: '$departments.code',
                department_name: '$departments.name',
              },
            },
            { $skip: paginationParams.skip },
            { $limit: paginationParams.limit },
          ], // add projection here wish you re-shape the docs
        },
      },
    ];

    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }

  //Get Equipments by projectID
  async getAllEquipmentsByLocation(filterReportDto: FilterReportDto) {
    mongoose.set('debug', true);

    let pipeline: any = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(filterReportDto.projectId),
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          departments: 1,
          equipments: 1,
          //  EquipmentAllocation: 1,
        },
      },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      { $unwind: '$departments.rooms.equipments' },
      //{ $unwind: '$equipmentAllocation' },
      // { $unwind: '$departments.rooms.equipmentAllocation' },
      //{ $unwind: '$rooms.equipmentAllocation' },

      // { $sort: { 'departments.rooms.equipments.name': -1 } },
    ];
    if (filterReportDto.group) {
      pipeline = [
        ...pipeline,

        {
          $match: {
            'departments.rooms.equipments.group': {
              $in: filterReportDto.group,
            },
          },
        },
      ];
    }
    // pipeline = [
    //   ...pipeline,

    //   {
    //     $group: {
    //       _id: '$departments.rooms.equipments.equipmentId',
    //       // locations: '$departments',
    //       locations: { $addToSet: '$departments' },
    //       equipment_code: { $first: '$departments.rooms.equipments.code' },
    //       equipment_name: { $first: '$departments.rooms.equipments.name' },
    //       department_code: { $first: '$departments.code' },
    //       department_name: { $first: '$departments.name' },
    //       room_code: { $first: '$departments.rooms.code' },
    //       room_name: { $first: '$departments.rooms.name' },
    //     },
    //   },
    // ];

    pipeline = [
      ...pipeline,
      {
        $project: {
          _id: '$departments.rooms.equipments.equipmentId',
          code: '$departments.rooms.equipments.code',
          name: '$departments.rooms.equipments.name',
          quantity: '$departments.rooms.equipments.quantity',
          price: '$departments.rooms.equipments.cost',
          group: '$departments.rooms.equipments.group',
          remarks: '$departments.rooms.equipments.remarks',
          project_code: '$code',
          project_name: '$name',
          room_code: '$departments.rooms.code',
          room_name: '$departments.rooms.name',
          department_code: '$departments.code',
          department_name: '$departments.name',
        },
      },
    ];

    console.log(pipeline);

    const results = await this.ProjectModel.aggregate(pipeline);

    return results;
  }

  //Get Rooms by projectID
  async getRoomListReport(
    // paginationParams: PaginationParams,
    projectId: string,
  ) {
    const pipeline: any = [
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [
            {
              $project: {
                fullName: 0,
                clientOwner: 0,
                contractNo: 0,
                noOfBeds: 0,
                classification: 0,
                type: 0,
                company: 0,
                signature1: 0,
                signature2: 0,
                departments: {
                  createdAt: 0,
                  updatedAt: 0,
                  rooms: {
                    createdAt: 0,
                    updatedAt: 0,
                    equipments: 0,
                    alias: 0,
                    size: 0,
                  },
                  alias: 0,
                  level: 0,
                },
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
                isTemplate: 0,
                address1: 0,
                address2: 0,
                city: 0,
                country: 0,
                dateInitiatedProposal: 0,
                postalZip: 0,
                proposedFacilityCompletionDate: 0,
                state: 0,
                currencies: 0,
              },
            },
            // { $skip: paginationParams.skip },
            // { $limit: paginationParams.limit },
          ],
        },
      },
    ];
    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }
}
