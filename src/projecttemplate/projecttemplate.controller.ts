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
import { ProjecttemplateService } from './projecttemplate.service';
import { CreateProjecttemplateDto } from './dto/create-projecttemplate.dto';
import { UpdateProjecttemplateDto } from './dto/update-projecttemplate.dto';
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

@Controller('projecttemplate')
@ApiTags('Projecttemplate')
export class ProjecttemplateController {
  constructor(
    private readonly projecttemplateService: ProjecttemplateService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Project-Template' })
  create(@Body() createProjecttemplateDto: CreateProjecttemplateDto) {
    return this.projecttemplateService.create(createProjecttemplateDto);
  }

   @Get()
  @ApiOperation({ summary: 'get all Project-Templates' })
  findAll(@Query() { skip, limit, startId }: PaginationParams) {
    const searchQuery = '';
    return this.projecttemplateService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get Groups by id' })
  findOne(@Param('id') id: string) {
    return this.projecttemplateService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Groups' })
  update(
    @Param('id') id: string,
    @Body() updateProjecttemplateDto: UpdateProjecttemplateDto,
  ) {
    return this.projecttemplateService.update(id, updateProjecttemplateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Groups' })
  remove(@Param('id') id: string) {
    return this.projecttemplateService.remove(id);
  }
}
