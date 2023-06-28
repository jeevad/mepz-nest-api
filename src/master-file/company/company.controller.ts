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
  UploadedFiles
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { Company } from './entities/company.entity';
@Controller('company')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  @ApiOperation({ summary: 'Create Company' })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo1', maxCount: 1 },
        { name: 'logo2', maxCount: 1 },
        { name: 'logo3', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './src/assets/companyEditPageImages',
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
  create(
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    if (files) {
      if (files.logo1 && files.logo1.length > 0) {
        createCompanyDto.logo1 = files.logo1[0].path;
      }
      if (files.logo2 && files.logo2.length > 0) {
        createCompanyDto.logo2 = files.logo2[0].path;
      }
      if (files.logo3 && files.logo3.length > 0) {
        createCompanyDto.logo3 = files.logo3[0].path;
      }
    }

    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Company' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams,
     // @Query('searchQuery') searchQuery?: string,
  ) {
    const searchQuery = '';
    return this.companyService.findAll(skip, limit, startId, searchQuery);
  }

  // @Get()
  // findAll() {
  //   return this.companyService.findAll();
  // }

  @Get(':id')
  @ApiOperation({ summary: 'get Company by id' })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Company' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Company' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}