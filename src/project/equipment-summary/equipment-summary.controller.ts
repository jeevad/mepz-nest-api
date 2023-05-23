import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { EquipmentSummaryService } from './equipment-summary.service';
import { CreateEquipmentSummaryDto } from './dto/create-equipment-summary.dto';
import { UpdateEquipmentSummaryDto } from './dto/update-equipment-summary.dto';
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

@Controller('equipment-summary')
@ApiTags('Equipment-Summary')
export class EquipmentSummaryController {
  constructor(
    private readonly equipmentSummaryService: EquipmentSummaryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create' })
  create(@Body() createEquipmentSummaryDto: CreateEquipmentSummaryDto) {
    return this.equipmentSummaryService.create(createEquipmentSummaryDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams,
  ) // @Query('searchQuery') searchQuery?: string,
  {
    const searchQuery = '';
    return this.equipmentSummaryService.findAll(
      skip,
      limit,
      startId,
      searchQuery,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'get by id' })
  findOne(@Param('id') id: string) {
    return this.equipmentSummaryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  update(
    @Param('id') id: string,
    @Body() updateEquipmentSummaryDto: UpdateEquipmentSummaryDto,
  ) {
    return this.equipmentSummaryService.update(id, updateEquipmentSummaryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  remove(@Param('id') id: string) {
    return this.equipmentSummaryService.remove(id);
  }
}
