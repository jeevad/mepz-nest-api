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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
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
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { Company } from './entities/company.entity';
@Controller('company')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create Company' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Company' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams, // @Query('searchQuery') searchQuery?: string,
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

  @Post('/uploadFile')
  @ApiOperation({ summary: 'Upload Images' })
  @UseInterceptors(
    FileInterceptor('logo1', {
      storage: diskStorage({
        destination: './src/assets/userImage',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  UploadedFile(@Res() res, @UploadedFile() file) {
    return res.status(HttpStatus.OK).json({
      success: true,
      data: file.path,
    });
  }
  // UploadedFile(@Res() res, @UploadedFile() file) {
  //   const company = new Company(); 

  //   company.logo1 = file.path;
  //   company
  //     .save()
  //     .then((savedCompany) => {
  //       return res.status(HttpStatus.OK).json({
  //         success: true,
  //         data: savedCompany,
  //       });
  //     })
  //     .catch((error) => {
  //       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //         success: false,
  //         error: error.message,
  //       });
  //     });
  // }
}
