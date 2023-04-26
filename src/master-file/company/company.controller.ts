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

@Controller('company')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  @ApiOperation({ summary: 'Create Company' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
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
