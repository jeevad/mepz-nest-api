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
import { EquipmentBrandService } from './equipment-brand.service';
import { CreateEquipmentBrandDto } from './dto/create-equipment-brand.dto';
import { UpdateEquipmentBrandDto } from './dto/update-equipment-brand.dto';
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

@Controller('equipment-brand')
@ApiTags('Equipment-Brand')
export class EquipmentBrandController {
  constructor(private readonly equipmentBrandService: EquipmentBrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create' })
  create(@Body() createEquipmentBrandDto: CreateEquipmentBrandDto) {
    return this.equipmentBrandService.create(createEquipmentBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All' })
  findAll(@Query() { skip, limit, startId }: PaginationParams) {
    const searchQuery = '';
    return this.equipmentBrandService.findAll(
      skip,
      limit,
      startId,
      searchQuery,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get by id' })
  findOne(@Param('id') id: string) {
    return this.equipmentBrandService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  update(
    @Param('id') id: string,
    @Body() updateEquipmentBrandDto: UpdateEquipmentBrandDto,
  ) {
    return this.equipmentBrandService.update(id, updateEquipmentBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  remove(@Param('id') id: string) {
    return this.equipmentBrandService.remove(id);
  }
}
