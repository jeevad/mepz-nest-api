import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  HttpStatus,
  Res,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { PaginationParams } from 'src/utils/paginationParams';
import { diskStorage } from 'multer';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Equipment } from './entities/equipment.entity';
@Controller('equipment')
@ApiTags('Equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create Equipments' })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Equipments' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams,
  ) // @Query('searchQuery') searchQuery?: string,
  {
    const searchQuery = '';
    return this.equipmentService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get Equipments by id' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(id);
  }

  // using create dto
  @Patch(':id')
  @ApiOperation({ summary: 'Update Equipment' })

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'fileOne', maxCount: 1 },
        { name: 'fileTwo', maxCount: 1 },
        { name: 'fileThree', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './src/assets/userImage',
          filename: (req, file, callBack) => {
            const fileName = file.originalname.replace(/\s/g, '');
            const fileExtension = path.extname(fileName);
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            callBack(null, `${randomName}${fileExtension}`);
          },
        }),
      },
    ),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    if (files) {
      if (files.fileOne && files.fileOne.length > 0) {
        updateEquipmentDto.equipmentPower.fileOne = files.fileOne[0].path;
      }
      if (files.fileTwo && files.fileTwo.length > 0) {
        updateEquipmentDto.equipmentPower.fileTwo = files.fileTwo[0].path;
      }
      if (files.fileThree && files.fileThree.length > 0) {
        updateEquipmentDto.equipmentPower.fileThree = files.fileThree[0].path;
      }
    }

    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Equipments' })
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(id);
  }

}
