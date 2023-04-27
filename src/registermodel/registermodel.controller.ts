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
import { RegistermodelService } from './registermodel.service';
import { CreateRegistermodelDto } from './dto/create-registermodel.dto';
import { UpdateRegistermodelDto } from './dto/update-registermodel.dto';
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

@Controller('registermodel')
@ApiTags('Registermodel')
export class RegistermodelController {
  constructor(private readonly registermodelService: RegistermodelService) {}

  @Post()
  @ApiOperation({ summary: 'Register User' })
  create(@Body() createRegistermodelDto: CreateRegistermodelDto) {
    return this.registermodelService.create(createRegistermodelDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Users' })
  findAll(@Query() { skip, limit, startId }: PaginationParams) {
    const searchQuery = '';
    return this.registermodelService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get Users by id' })
  findOne(@Param('id') id: string) {
    return this.registermodelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update users' })
  update(
    @Param('id') id: string,
    @Body() updateRegistermodelDto: UpdateRegistermodelDto,
  ) {
    return this.registermodelService.update(id, updateRegistermodelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Users' })
  remove(@Param('id') id: string) {
    return this.registermodelService.remove(id);
  }
}
