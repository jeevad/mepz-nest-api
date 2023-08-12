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
import { AdmingroupService } from './admingroup.service';
import { CreateAdmingroupDto } from './dto/create-admingroup.dto';
import { UpdateAdmingroupDto } from './dto/update-admingroup.dto';
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

@Controller('admingroup')
@ApiTags('Admingroup')
export class AdmingroupController {
  constructor(private readonly admingroupService: AdmingroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create Admin Group' })
  create(@Body() createAdmingroupDto: CreateAdmingroupDto) {
    return this.admingroupService.create(createAdmingroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Admin Groups' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams,
  ) // @Query('searchQuery') searchQuery?: string,
  {
    const searchQuery = '';
    return this.admingroupService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get group name by id' })
  findOne(@Param('id') id: string) {
    return this.admingroupService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update group name' })
  update(
    @Param('id') id: string,
    @Body() updateAdmingroupDto: UpdateAdmingroupDto,
  ) {
    return this.admingroupService.update(id, updateAdmingroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete group name' })
  remove(@Param('id') id: string) {
    return this.admingroupService.remove(id);
  }
}
