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
import { ClassificationService } from './classification.service';
import { CreateClassificationDto } from './dto/create-classification.dto';
import { UpdateClassificationDto } from './dto/update-classification.dto';
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

@Controller('classification')
@ApiTags('Classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Classification' })
  create(@Body() createClassificationDto: CreateClassificationDto) {
    return this.classificationService.create(createClassificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Classifications' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams,
  ) // @Query('searchQuery') searchQuery?: string,

  {
    return this.classificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get Classifications by id' })
  findOne(@Param('id') id: string) {
    return this.classificationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Classifications' })
  update(
    @Param('id') id: string,
    @Body() updateClassificationDto: UpdateClassificationDto,
  ) {
    return this.classificationService.update(id, updateClassificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Classifications' })
  remove(@Param('id') id: string) {
    return this.classificationService.remove(id);
  }
}
