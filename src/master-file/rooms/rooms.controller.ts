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
import { RoomsService } from './rooms.service';
import { CreateRoomsDto } from './dto/create-rooms.dto';
import { UpdateRoomsDto } from './dto/update-rooms.dto';
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

@Controller('rooms')
@ApiTags('Rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Rooms' })
  create(@Body() createRoomsDto: CreateRoomsDto) {
    return this.roomsService.create(createRoomsDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all Rooms' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams, 
    // @Query('searchQuery') searchQuery?: string,
  ) {
    const searchQuery = '';
    return this.roomsService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get Rooms by id' })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Rooms' })
  update(@Param('id') id: string, @Body() updateRoomsDto: UpdateRoomsDto) {
    return this.roomsService.update(id, updateRoomsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Rooms' })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}