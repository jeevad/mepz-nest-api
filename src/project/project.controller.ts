import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationParams } from 'src/utils/paginationParams';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AddProjectDepartmentDto } from './dto/add-project-department.dto';
import { AddProjectRoomEquipmentDto } from './dto/add-project-room-equipment.dto';
import { AddProjectDepartmentRoomDto } from './dto/add-project-department-room.dto';
import { UpdateProjectFieldDto } from './dto/update-project-field.dto';
import { FilterEquipmentDto } from './dto/filter-equipment.dto';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create Project' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Projects' })
  findAll(@Query() { skip, limit, startId }: PaginationParams) {
    const searchQuery = '';
    return this.projectService.findAll(skip, limit, startId, searchQuery);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Projects' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Projects' })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Post('addDepartment/:projectId')
  @ApiOperation({ summary: 'Add Department' })
  addDepartment(
    @Param('projectId') projectId: string,
    @Body() addProjectDepartmentDto: AddProjectDepartmentDto[], // [] added
  ) {
    return this.projectService.addDepartment(
      projectId,
      addProjectDepartmentDto,
    );
  }

  // update selected project fields
  @Post('updateProjectFields/:projectId')
  @ApiOperation({ summary: 'Update Project Fields' })
  updateDepartment(
    @Param('projectId') projectId: string,
    @Body() updateProjectFieldDto: UpdateProjectFieldDto,
  ) {
    return this.projectService.updateDepartment(
      projectId,
      updateProjectFieldDto,
    );
  }

  //Get Departments by projectId
  @Get('getDepartments/:projectId')
  @ApiOperation({ summary: 'get departments by id' })
  async getDepartments(
    @Param('projectId') projectId: string,
    @Query() { skip, limit, startId }: PaginationParams,
  ) {
    const searchQuery = '';
    return this.projectService.getDepartments(
      projectId,
      skip,
      limit,
      startId,
      searchQuery,
    );
  }

  //Get Rooms by projectId
  @Get('getRooms/:projectId/:deptId')
  @ApiOperation({ summary: 'get rooms by project id' })
  getRooms(
    @Param('projectId') projectId: string,
    @Param('deptId') deptId: string,
  ) {
    return this.projectService.getRooms(projectId, deptId);
  }

  //Get Equipments by projectId
  @Get('getEquipments/:projectId/:deptId/:roomId')
  @ApiOperation({ summary: 'get equipments by project id' })
  getEquipments(
    @Param('projectId') projectId: string,
    @Param('deptId') deptId: string,
    @Param('roomId') roomId: string,
  ) {
    return this.projectService.getEquipments(projectId, deptId, roomId);
  }

  //Get Equipments by projectId
  @Get('getProjectEquipments/:projectId')
  @ApiOperation({ summary: 'get equipments by project id' })
  getProjectEquipments(
    @Param('projectId') projectId: string,
    @Query() paginationParams: PaginationParams,
  ) {
    const deptId = '';
    const roomId = '';
    return this.projectService.getProjectEquipments(
      projectId,
      paginationParams,
    );
  }

  @Get('getAllEquipments')
  @ApiOperation({ summary: 'get all equipments' })
  getAllEquipments(
    @Query() paginationParams: PaginationParams,
    @Query() filterEquipmentDto: FilterEquipmentDto,
  ) {
    console.log('filterEquipmentDto', filterEquipmentDto);
    // return 'test';
    return this.projectService.getAllEquipments(
      filterEquipmentDto,
      paginationParams,
    );
  }

  //Get Departments by projectId
  @Get('getAllDepartments')
  @ApiOperation({ summary: 'get departments by id' })
  async getAllDepartments(
    @Query() paginationParams: PaginationParams,
    @Query() filterEquipmentDto: FilterEquipmentDto,
  ) {
    const results: any = await this.projectService.getAllDepartments(
      filterEquipmentDto,
      paginationParams,
    );
    return results;
    let depts = [];
    results.forEach((element) => {
      depts = [...depts, ...element.departments];
    });
  }

  //Get Rooms by projectId
  @Get('getAllRooms')
  @ApiOperation({ summary: 'get rooms by project id' })
  getAllRooms(
    @Query() paginationParams: PaginationParams,
    @Query() filterEquipmentDto: FilterEquipmentDto,
  ) {
    return this.projectService.getAllRooms(
      filterEquipmentDto,
      paginationParams,
    );
  }

  @Post('addRoom/:projectId/:departmentId')
  @ApiOperation({ summary: 'Add room' })
  addRoom(
    @Param('projectId') projectId: string,
    @Param('departmentId') departmentId: string,
    @Body() addProjectDepartmentRoomDto: AddProjectDepartmentRoomDto,
  ) {
    return this.projectService.addRoom(
      projectId,
      departmentId,
      addProjectDepartmentRoomDto,
    );
  }

  @Post('addRoomEquipment/:projectId/:departmentId/:roomId')
  @ApiOperation({ summary: 'Add Room Equipment' })
  addRoomEquipment(
    @Param('projectId') projectId: string,
    @Param('departmentId') departmentId: string,
    @Param('roomId') roomId: string,
    @Body() addProjectRoomEquipmentDto: AddProjectRoomEquipmentDto,
  ) {
    return this.projectService.addRoomEquipment(
      projectId,
      departmentId,
      roomId,
      addProjectRoomEquipmentDto,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'get Projects by id' })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }
}
