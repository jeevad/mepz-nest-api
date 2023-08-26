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

@Injectable({ scope: Scope.REQUEST })
export class ProjectService {
  ProjectDepartmentModel: any;
  user: any;
  constructor(
    @InjectModel(Project.name)
    private readonly ProjectModel: Model<ProjectDocument>,
    @InjectModel(ProjectEquipment.name)
    private readonly projectEquipmentModel: Model<ProjectEquipmentDocument>,
    private logModel: ActivityLogsService, // @Inject('CurrentContext') private context: CurrentContext
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    // const logInfo: any = {
    //   url: 'auth/login',
    //   method: 'post',
    //   pageName: 'logged in',
    //   user: this.user,
    //   // request,
    // };
    // console.log('log', logInfo);
    this.logModel.logAction(`Created project`, createProjectDto);
    // this.logModel.create(logInfo);
    const Project = new this.ProjectModel(createProjectDto);
    return Project.save();
  }
  async createProjectEquipment(
    createProjectEquipmentDto: any,
  ): Promise<ProjectEquipment> {
    // const logInfo: any = {
    //   url: 'auth/login',
    //   method: 'post',
    //   pageName: 'logged in',
    //   user: this.user,
    //   // request,
    // };
    // console.log('log', logInfo);
    this.logModel.logAction(`Created project`, createProjectEquipmentDto);
    // this.logModel.create(logInfo);
    const Project = new this.projectEquipmentModel(createProjectEquipmentDto);
    return Project.save();
  }

  async findAll(paginationParams: PaginationParams, projectType) {
    // mongoose.set('debug', true);
    const filters: FilterQuery<ProjectDocument> = paginationParams.startId
      ? { _id: { $gt: paginationParams.startId } }
      : {};
    filters.isTemplate = projectType === 'template';
    if (paginationParams.searchQuery) {
      filters.$text = { $search: paginationParams.searchQuery };
    }

    const findQuery = this.ProjectModel.find(filters)
      .select({ departments: 0 })
      .sort({ _id: -1 })
      .skip(paginationParams.skip);

    if (paginationParams.limit) {
      findQuery.limit(paginationParams.limit);
    }

    const results = await findQuery;
    const count = await this.ProjectModel.count(filters);

    this.logModel.logAction('Viewed project list page');

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

  async updateAccessLevel(payload: any): Promise<any> {
    mongoose.set('debug', true);

    payload.projects.forEach(async (project) => {
      const oldProject = await this.findOne(project.id);
      const groupExists = oldProject.accessLevel.find(
        (item) => item.group === project.group,
      );
      // console.log('groupExists', groupExists);

      if (groupExists) {
        const result = await this.ProjectModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(project.id),
          },
          { $set: { 'accessLevel.$[i].crud': project } },
          {
            arrayFilters: [
              {
                'i.group': project.group,
              },
            ],
          },
        );
      } else {
        const accessLevel = {
          group: project.group,
          crud: project,
        };

        const result = await this.ProjectModel.updateOne(
          { _id: new mongoose.Types.ObjectId(project.id) },
          {
            $push: {
              accessLevel: accessLevel,
            },
          },
        );
      }
    });
    return { message: `${payload.projects.length} project updated` };
  }

  async remove(id: string) {
    return this.ProjectModel.findByIdAndRemove(id);
  }

  async addDepartment(
    projectId: string,
    addProjectDepartmentDtos: AddProjectDepartmentDto[], // [] added
  ): Promise<any> {
    // return this.ProjectModel.findOneAndUpdate(  // Old
    this.logModel.logAction(
      `Added department to project ID ${projectId}`,
      addProjectDepartmentDtos,
    );
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
        this.logModel.logAction(
          `Updated department in project ID ${projectId}`,
          updateProjectFieldDto,
        );
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
        this.logModel.logAction(
          `Updated room in project ID ${projectId}`,
          updateProjectFieldDto,
        );
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
        this.logModel.logAction(
          `Updated equipment in project ID ${projectId}`,
          updateProjectFieldDto,
        );
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
  async getAllRooms(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams: PaginationParams,
  ) {
    // mongoose.set('debug', true);
    let projectId = [];
    if (Array.isArray(filterEquipmentDto.projectId)) {
      projectId = filterEquipmentDto.projectId.map((item) => {
        return new mongoose.Types.ObjectId(item);
      });
    } else {
      projectId = [new mongoose.Types.ObjectId(filterEquipmentDto.projectId)];
    }

    const pipeline: any = [
      { $match: { _id: { $in: projectId } } },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [
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
            { $skip: paginationParams.skip },
            { $limit: paginationParams.limit },
          ], // add projection here wish you re-shape the docs
        },
      },
    ];
    // if (filterEquipmentDto.departmentId) {
    //   pipeline.push({
    //     $match: {
    //       'departments._id': new mongoose.Types.ObjectId(
    //         filterEquipmentDto.departmentId,
    //       ),
    //     },
    //   });
    // }
    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
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

  //Get getdepartmentEquipments
  async getdepartmentEquipmentsbygroups(filterReportDto: FilterReportDto) {
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
        },
      },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      { $unwind: '$departments.rooms.equipments' },
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

    pipeline = [
      ...pipeline,
      {
        $project: {
          _id: '$departments.rooms.equipments.equipmentId',
          code: '$departments.rooms.equipments.code',
          name: '$departments.rooms.equipments.name',
          quantity: '$departments.rooms.equipments.quantity',
          cost: '$departments.rooms.equipments.cost',
          group: '$departments.rooms.equipments.group',
          project_code: '$code',
          project_name: '$name',
          room_code: '$departments.rooms.code',
          room_name: '$departments.rooms.name',
          department_code: '$departments.code',
          department_name: '$departments.name',
        },
      },
    ];
    console.log('test4');
    console.log(pipeline);

    const results = await this.ProjectModel.aggregate(pipeline);
    return results;
  }
  //Get Equipments by projectID
  async getAllDisabledEquipments(filterReportDto: FilterReportDto) {
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
        },
      },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      { $unwind: '$departments.rooms.equipments' },
      {
        $match: {
          'departments.rooms.equipments.active': false,
        },
      },
    ];

    pipeline = [
      ...pipeline,
      {
        $project: {
          _id: '$departments.rooms.equipments.equipmentId',
          code: '$departments.rooms.equipments.code',
          name: '$departments.rooms.equipments.name',
          quantity: '$departments.rooms.equipments.qty',
          project_code: '$code',
          project_name: '$name',
          room_code: '$departments.rooms.code',
          room_name: '$departments.rooms.name',
          department_code: '$departments.code',
          department_name: '$departments.name',
        },
      },
    ];

    //console.log(pipeline);

    const results = await this.ProjectModel.aggregate(pipeline);
    return results;
  }

  //Get Equipments by group

  //Get Equipments by group
  async getAllEquipmentsbygroup(filterReportDto: FilterReportDto, rev_id) {
    mongoose.set('debug', true);
    console.log(filterReportDto.group);
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
        },
      },
      { $unwind: '$departments' },
      { $unwind: '$departments.rooms' },
      { $unwind: '$departments.rooms.equipments' },
    ];

    if (rev_id != '') {
      pipeline = [
        ...pipeline,

        {
          $match: {
            'departments.rooms.equipments.revisionid': rev_id,
          },
        },
      ];
    }

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

    pipeline = [
      ...pipeline,
      {
        $project: {
          _id: '$departments.rooms.equipments.equipmentId',
          code: '$departments.rooms.equipments.code',
          name: '$departments.rooms.equipments.name',
          quantity: '$departments.rooms.equipments.quantity',
          quantity2: '$departments.rooms.equipments.quantity',
          quantity4: '$departments.rooms.equipments.group',
          group: '$departments.rooms.equipments.group',
          cost: '$departments.rooms.equipments.cost',
          group4: '$departments.rooms.equipments.group',
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

    //console.log(pipeline);

    const EquipmentItemlist = await this.ProjectModel.aggregate(pipeline);

    return { EquipmentItemlist };
  }
  //console.log(pipeline);

  async getAllEquipmentsbyroomdepartbygroup(
    filterReportDto: FilterReportDto,
    rev_id,
  ) {
    mongoose.set('debug', true);
    let group_array: Array<any> = [];
    if (filterReportDto.group && rev_id != '') {
      group_array = filterReportDto.group;
      let pipeline: any = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(filterReportDto.projectId),
          },
        },
        {
          $addFields: {
            departments: {
              $map: {
                input: '$departments',
                as: 'dept',
                in: {
                  $mergeObjects: [
                    '$$dept',
                    {
                      rooms: {
                        $map: {
                          input: '$$dept.rooms',
                          as: 'rooms',
                          in: {
                            $mergeObjects: [
                              '$$rooms',
                              {
                                equipments: {
                                  $filter: {
                                    input: '$$rooms.equipments',
                                    as: 'equipment',
                                    cond: {
                                      $in: ['$$equipment.group', group_array],
                                      $eq: ['$$equipments.revisionid', rev_id],
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ];
      const results = await this.ProjectModel.aggregate(pipeline);
      return results;
    } else if (filterReportDto.group) {
      group_array = filterReportDto.group;
      let pipeline: any = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(filterReportDto.projectId),
          },
        },
        {
          $addFields: {
            departments: {
              $map: {
                input: '$departments',
                as: 'dept',
                in: {
                  $mergeObjects: [
                    '$$dept',
                    {
                      rooms: {
                        $map: {
                          input: '$$dept.rooms',
                          as: 'rooms',
                          in: {
                            $mergeObjects: [
                              '$$rooms',
                              {
                                equipments: {
                                  $filter: {
                                    input: '$$rooms.equipments',
                                    as: 'equipment',
                                    cond: {
                                      $in: ['$$equipment.group', group_array],
                                    },
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ];
      const results = await this.ProjectModel.aggregate(pipeline);
      return results;
    } else {
      let pipeline: any = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(filterReportDto.projectId),
          },
        },
        {
          $addFields: {
            departments: {
              $map: {
                input: '$departments',
                as: 'dept',
                in: {
                  $mergeObjects: [
                    '$$dept',
                    {
                      rooms: {
                        $map: {
                          input: '$$dept.rooms',
                          as: 'rooms',
                          in: {
                            $mergeObjects: [
                              '$$rooms',
                              {
                                /*
                                equipments: {
                                  $filter: {
                                    input: "$$rooms.equipments",
                                    as: "equipment",
                                    cond: {
                                      $in: [
                                        "$$equipment.group",
                                        group_array
                                      ],
                                      
                                    },
                                    
                                  }, 
                                  
                                },*/
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      ];
      const results = await this.ProjectModel.aggregate(pipeline);
      return results;
    }
  }
  async getAllDEquipmentsbyvariations(
    filterReportDto: FilterReportDto,
    rev_id,
  ) {
    mongoose.set('debug', true);

    let pipeline: any = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(filterReportDto.projectId),
        },
      },
      {
        $addFields: {
          departments: {
            $map: {
              input: '$departments',
              as: 'departments',
              in: {
                $mergeObjects: [
                  '$$departments',
                  {
                    rooms: {
                      $map: {
                        input: '$$departments.rooms',
                        as: 'rooms',
                        in: {
                          $mergeObjects: [
                            '$$rooms',
                            {
                              /*
                                  equipments: {
                                    $filter: {
                                      input: '$$rooms.equipments',
                                      as: 'equipments',
                                      cond: {
                                        $eq: ['$$equipments.revisionid', rev_id],
                                      },
                                    },
                                  },
                                  */
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ];
    const results = await this.ProjectModel.aggregate(pipeline);

    return results;
  }
  async getAllDisabledEquipmentsbyroomdepart(filterReportDto: FilterReportDto) {
    mongoose.set('debug', true);

    let pipeline: any = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(filterReportDto.projectId),
        },
      },
      {
        $addFields: {
          departments: {
            $map: {
              input: '$departments',
              as: 'departments',
              in: {
                $mergeObjects: [
                  '$$departments',
                  {
                    rooms: {
                      $map: {
                        input: '$$departments.rooms',
                        as: 'rooms',
                        in: {
                          $mergeObjects: [
                            '$$rooms',
                            {
                              equipments: {
                                $filter: {
                                  input: '$$rooms.equipments',
                                  as: 'equipments',
                                  cond: {
                                    $eq: ['$$equipments.active', true],
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ];
    const results = await this.ProjectModel.aggregate(pipeline);

    return results;
  }

  async getAllEquipmentswithUtility(filterReportDto: FilterReportDto) {
    mongoose.set('debug', true);

    let pipeline: any = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(filterReportDto.projectId),
        },
      },
      {
        $addFields: {
          departments: {
            $map: {
              input: '$departments',
              as: 'departments',
              in: {
                $mergeObjects: [
                  '$$departments',
                  {
                    rooms: {
                      $map: {
                        input: '$$departments.rooms',
                        as: 'rooms',
                        in: {
                          $mergeObjects: [
                            '$$rooms',
                            {
                              equipments: {
                                /*$filter: {
                      input: "$$rooms.equipments",
                      as: "equipments",
                     cond: {
                        $eq: [
                          "$$equipments.active",
                          false
                        ]
						
                      } 
                    }*/
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ];
    const results = await this.ProjectModel.aggregate(pipeline);

    return results;
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
  //Get Equipments by projectID
  async getAllEquipmentsByLocation_eqID(
    filterReportDto: FilterReportDto,
    eq_code,
  ) {
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
      {
        $match: {
          'departments.rooms.equipments.code': eq_code,
        },
      },
      //{ $unwind: '$equipmentAllocation' },
      // { $unwind: '$departments.rooms.equipmentAllocation' },
      //{ $unwind: '$rooms.equipmentAllocation' },

      // { $sort: { 'departments.rooms.equipments.name': -1 } },
    ];

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
  async getAllEquipments_unique_dsply_by_revision(filterReportDto, rev1) {
    mongoose.set('debug', true);
    let projectId = [];
    if (Array.isArray(filterReportDto.projectId)) {
      projectId = filterReportDto.projectId.map((item) => {
        return new mongoose.Types.ObjectId(item);
      });
    } else {
      projectId = [new mongoose.Types.ObjectId(filterReportDto.projectId)];
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

    if (filterReportDto.departmentId) {
      pipeline.push({
        $match: {
          'departments._id': new mongoose.Types.ObjectId(
            filterReportDto.departmentId,
          ),
        },
      });
    }
    pipeline = [...pipeline, { $unwind: '$departments.rooms' }];
    if (filterReportDto.roomId) {
      pipeline.push({
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(
            filterReportDto.roomId,
          ),
        },
      });
    }
    pipeline = [...pipeline, { $unwind: '$departments.rooms.equipments' }];

    if (rev1) {
      pipeline.push({
        $match: {
          'departments.rooms.equipments.revisionid': rev1,
        },
      });
    }

    pipeline = [
      ...pipeline,
      {
        $group: {
          _id: '$departments.rooms.equipments.equipmentId',
          code: { $first: '$departments.rooms.equipments.code' },
          name: { $first: '$departments.rooms.equipments.name' },
          cost: { $first: '$departments.rooms.equipments.cost' },
          quantity: { $first: '$departments.rooms.equipments.quantity' },
          room_code: { $first: '$departments.rooms.code' },
          room_name: { $first: '$departments.rooms.name' },
          project_name: { $first: '$name' },
        },
      },
    ];
    console.log('GGGGGGGGGGGGGGGGGG222:::::');
    console.log(JSON.stringify(pipeline));
    const results = await this.ProjectModel.aggregate(pipeline);
    return results;
  }

  async getAllEquipments_unique_dsply(filterReportDto) {
    mongoose.set('debug', true);
    let projectId = [];
    if (Array.isArray(filterReportDto.projectId)) {
      projectId = filterReportDto.projectId.map((item) => {
        return new mongoose.Types.ObjectId(item);
      });
    } else {
      projectId = [new mongoose.Types.ObjectId(filterReportDto.projectId)];
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

    if (filterReportDto.departmentId) {
      pipeline.push({
        $match: {
          'departments._id': new mongoose.Types.ObjectId(
            filterReportDto.departmentId,
          ),
        },
      });
    }
    pipeline = [...pipeline, { $unwind: '$departments.rooms' }];
    if (filterReportDto.roomId) {
      pipeline.push({
        $match: {
          'departments.rooms._id': new mongoose.Types.ObjectId(
            filterReportDto.roomId,
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
          cost: { $first: '$departments.rooms.equipments.cost' },
          quantity: { $first: '$departments.rooms.equipments.quantity' },
          room_code: { $first: '$departments.rooms.code' },
          room_name: { $first: '$departments.rooms.name' },
          project_name: { $first: '$name' },
          group: { $first: '$departments.rooms.equipments.group' },
        },
      },
    ];

    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }

  async getAllEquipments_unique(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams: PaginationParams,
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
      {
        $group: {
          _id: '$departments.rooms.equipments.equipmentId',
          code: { $first: '$departments.rooms.equipments.code' },
          name: { $first: '$departments.rooms.equipments.name' },
          room_code: { $first: '$departments.rooms.code' },
          room_name: { $first: '$departments.rooms.name' },
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
    if (paginationParams.limit) {
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
    }
    const results = await this.ProjectModel.aggregate(pipeline);
    return { results };
  }

  async getAllEquipments_bkp(
    filterEquipmentDto: FilterEquipmentDto,
    paginationParams: PaginationParams,
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
    this.logModel.logAction(
      `Added room to project ID ${projectId}`,
      addProjectDepartmentRoomDto,
    );
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
    this.logModel.logAction(
      `Added equipment to project ID ${projectId}`,
      addProjectRoomEquipmentDto,
    );
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
