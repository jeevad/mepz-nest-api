import { Controller, Get, Res } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('migrations')
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Get('group')
  @ApiOperation({ summary: 'migrate Group' })
  async migrateGroup() {
    return await this.migrationsService.migrateGroup();
  }

  @Get('department')
  @ApiOperation({ summary: 'migrate Department' })
  async migrateDepartment() {
    return await this.migrationsService.migrateDepartment();
  }


}
