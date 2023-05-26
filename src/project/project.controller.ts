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

  @Get(':id')
  @ApiOperation({ summary: 'get Projects by id' })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
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
    @Body() addProjectDepartmentDto: AddProjectDepartmentDto,
  ) {
    return this.projectService.addDepartment(
      projectId,
      addProjectDepartmentDto,
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

  @Get('getDepartments/:id')
  @ApiOperation({ summary: 'get Project by id' })
  getDepartments(@Param('id') id: string) {
    return this.projectService.getDepartments(id);
  }
}
