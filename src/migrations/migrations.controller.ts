import { Controller, Get, Res } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('migrations')
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Get('migrate-master')
  @ApiOperation({ summary: 'migrate master' })
  async migrateMaster() {
    return await this.migrationsService.runMasterTable();
  }

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

  @Get('migrate-project')
  @ApiOperation({ summary: 'migrate master' })
  async migrateProject() {
    return await this.migrationsService.migrateProject();
  }
}
