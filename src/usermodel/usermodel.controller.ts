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
import { UsermodelService } from './usermodel.service';
import { CreateUsermodelDto } from './dto/create-usermodel.dto';
import { UpdateUsermodelDto } from './dto/update-usermodel.dto';
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

@Controller('usermodel')
@ApiTags('Usermodel')
export class UsermodelController {
  constructor(private readonly usermodelService: UsermodelService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  create(@Body() createUsermodelDto: CreateUsermodelDto) {
    return this.usermodelService.create(createUsermodelDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Users' })
  findAll(@Query() { skip, limit, startId }: PaginationParams) {
    const searchQuery = '';
    return this.usermodelService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get Users by id' })
  findOne(@Param('id') id: string) {
    return this.usermodelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update users' })
  update(
    @Param('id') id: string,
    @Body() updateUsermodelDto: UpdateUsermodelDto,
  ) {
    return this.usermodelService.update(id, updateUsermodelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Users' })
  remove(@Param('id') id: string) {
    return this.usermodelService.remove(id);
  }
}
