import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
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

@Controller('utility')
@ApiTags('Utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Post()
  @ApiOperation({ summary: 'Create Utility' })
  create(@Body() createUtilityDto: CreateUtilityDto) {
    return this.utilityService.create(createUtilityDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Utilities' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams, 
    // @Query('searchQuery') searchQuery?: string,
  ) {
    const searchQuery = '';
    return this.utilityService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get utilities by id' })
  findOne(@Param('id') id: string) {
    return this.utilityService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Utilities' })
  update(@Param('id') id: string, @Body() updateUtilityDto: UpdateUtilityDto) {
    return this.utilityService.update(id, updateUtilityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Utilities' })
  remove(@Param('id') id: string) {
    return this.utilityService.remove(id);
  }
}
