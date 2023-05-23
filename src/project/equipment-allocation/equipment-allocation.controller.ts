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
import { EquipmentAllocationService } from './equipment-allocation.service';
import { CreateEquipmentAllocationDto } from './dto/create-equipment-allocation.dto';
import { UpdateEquipmentAllocationDto } from './dto/update-equipment-allocation.dto';
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

@Controller('equipment-allocation')
@ApiTags('Equipment-Allocation')
export class EquipmentAllocationController {
  constructor(
    private readonly equipmentAllocationService: EquipmentAllocationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create' })
  create(@Body() createEquipmentAllocationDto: CreateEquipmentAllocationDto) {
    return this.equipmentAllocationService.create(createEquipmentAllocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams, // @Query('searchQuery') searchQuery?: string,
  ) {
    const searchQuery = '';
    return this.equipmentAllocationService.findAll(
      skip,
      limit,
      startId,
      searchQuery,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get by ID' })
  findOne(@Param('id') id: string) {
    return this.equipmentAllocationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  update(
    @Param('id') id: string,
    @Body() updateEquipmentAllocationDto: UpdateEquipmentAllocationDto,
  ) {
    return this.equipmentAllocationService.update(
      id,
      updateEquipmentAllocationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  remove(@Param('id') id: string) {
    return this.equipmentAllocationService.remove(id);
  }
}
