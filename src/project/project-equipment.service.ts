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
import { UpdateProjectEquipmentFieldDto } from './dto/update-project-equipment-field.dto';

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

  async create(createProjectEquipmentDto: any): Promise<ProjectEquipment> {
    this.logModel.logAction(`Added equipments`, createProjectEquipmentDto);
    createProjectEquipmentDto.qty = 1;
    const project = new this.projectEquipmentModel(createProjectEquipmentDto);
    return project.save();
  }

  setRegxfilter(fields, query) {
    const cond = [];
    fields.forEach((field) => {
      cond.push({
        [field]: new RegExp(`.*${query}.*`, 'i'),
      });
    });
    return cond;
  }
  async findAll(filterEquipmentDto: FilterEquipmentDto) {
    mongoose.set('debug', true);
    let filters: FilterQuery<ProjectEquipmentDocument> = {};

    if (Array.isArray(filterEquipmentDto.projectIds)) {
      filters['project.projectId'] = { $in: filterEquipmentDto.projectIds };
    } else {
      filters['project.projectId'] = filterEquipmentDto.projectId;
    }
    if (filterEquipmentDto.departmentId) {
      filters['department.projectDepartmentId'] =
        filterEquipmentDto.departmentId;
    }
    if (filterEquipmentDto.roomId) {
      filters['room.projectRoomId'] = filterEquipmentDto.roomId;
    }

    let orCond = [];
    if (filterEquipmentDto.roomQuery) {
      orCond = this.setRegxfilter(
        ['room.name', 'room.code'],
        filterEquipmentDto.roomQuery,
      );
    }
    if (filterEquipmentDto.departmentQuery) {
      orCond = [
        ...this.setRegxfilter(
          ['department.name', 'department.code'],
          filterEquipmentDto.departmentQuery,
        ),
        ...orCond,
      ];
    }
    if (filterEquipmentDto.equipmentQuery) {
      orCond = [
        ...this.setRegxfilter(
          ['name', 'code'],
          filterEquipmentDto.equipmentQuery,
        ),
        ...orCond,
      ];
    }
    // filters['$or'] = orCond;
    if (filterEquipmentDto.searchQuery) {
      filters.$text = { $search: filterEquipmentDto.searchQuery };
    }
    console.log('orCond', orCond);
    console.log('filters', filters);

    const findQuery = this.projectEquipmentModel
      .find(filters)
      // .select({ departments: 0 })
      .sort({ _id: -1 })
      .skip(filterEquipmentDto.skip);

    if (filterEquipmentDto.lean) {
      findQuery.lean();
    }

    if (filterEquipmentDto.limit) {
      findQuery.limit(filterEquipmentDto.limit);
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
  async combineEquipmentWithProject(filterEquipmentDto: FilterEquipmentDto) {
    const projectId = filterEquipmentDto.projectId;

    const pipeline = [
      {
        $lookup: {
          from: 'equipment',
          localField: 'code',
          foreignField: 'code',
          as: 'equipmentData',
        },
      },
      {
        $lookup: {
          from: 'projectequipments',
          localField: 'code',
          foreignField: 'code',
          as: 'projectData',
        },
      },
      {
        $unwind: {
          path: '$equipmentData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$projectData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { equipmentData: { $exists: true } },
            { 'projectData.projectId': projectId },
          ],
        },
      },
      {
        $project: {
          code: 1,
          name: 1,
          'project.name': '$projectData.projectId',
          projectId: '$projectData.projectId',
          equipmentName: '$equipmentData.name',
          package: '$equipmentData.equipmentPackage.package',
          utility: '$equipmentData.utility',
          brands: '$equipmentData.brands',
        },
      },
      {
        $group: {
          _id: '$code',
          code: { $first: '$code' },
        },
      },
      // Add a $limit stage to limit the result to 100 documents
      {
        $limit: 10,
      },
    ];

    const results = await this.projectEquipmentModel.aggregate(pipeline).exec();

    //console.log(result);
    return { results };
  }
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    this.logModel.logAction(`Updated project ID ${id}`, updateProjectDto);
    return this.ProjectModel.findByIdAndUpdate(id, updateProjectDto);
  }

  async updateEquipmentFields(
    equipmentId: string,
    updateProjectEquipmentFieldDto: UpdateProjectEquipmentFieldDto,
  ): Promise<any> {
    // mongoose.set('debug', true);

    const res = await this.projectEquipmentModel.updateOne(
      { _id: equipmentId },
      {
        $set: {
          [`${updateProjectEquipmentFieldDto.field}`]:
            updateProjectEquipmentFieldDto.value,
        },
      },
    );
    this.logModel.logAction(
      `Updated equipmentID ${equipmentId}`,
      updateProjectEquipmentFieldDto,
    );
    return res;
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
  async getRoomDetail(projectId, field, value) {
    // mongoose.set('debug', true);
    const pipeline: any = [
      { $match: { _id: new mongoose.Types.ObjectId(projectId) } },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      {
        $match: {
          // 'departments.rooms._id': new mongoose.Types.ObjectId(roomId),
          [`departments.rooms.${field}`]: value,
        },
      },
      {
        $project: {
          _id: 0,
          'project.name': '$name',
          'project.code': '$code',
          'project.projectId': '$_id',
          'department.code': '$departments.code',
          'department.name': '$departments.name',
          'department.projectDepartmentId': '$departments._id',
          'department.masterId': '$departments.masterId',
          'room.code': '$departments.rooms.code',
          'room.name': '$departments.rooms.name',
          'room.projectRoomId': '$departments.rooms._id',
          'room.mysqlRoomId': '$departments.rooms.mysqlRoomId',
          'room.disabled': '$departments.rooms.disabled',
          'room.masterId': '$departments.rooms.masterId',
        },
      },
    ];
    const results = await this.ProjectModel.aggregate(pipeline);
    return results[0];
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
