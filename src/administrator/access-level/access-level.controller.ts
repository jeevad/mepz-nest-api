import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessLevelService } from './access-level.service';
import { CreateAccessLevelDto } from './dto/create-access-level.dto';
import { UpdateAccessLevelDto } from './dto/update-access-level.dto';

@Controller('access-level')
export class AccessLevelController {
  constructor(private readonly accessLevelService: AccessLevelService) {}

  @Post()
  create(@Body() createAccessLevelDto: CreateAccessLevelDto) {
    return this.accessLevelService.create(createAccessLevelDto);
  }

  @Get()
  findAll() {
    return this.accessLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessLevelDto: UpdateAccessLevelDto) {
    return this.accessLevelService.update(+id, updateAccessLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessLevelService.remove(+id);
  }
}
