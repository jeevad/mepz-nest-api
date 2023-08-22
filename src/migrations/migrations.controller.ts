import { Controller, Get, Res } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('migrations')
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Get('pdf')
  @ApiOperation({ summary: 'pdf example' })
  async generatePdf2(@Res() res) {
    return await this.migrationsService.doSomeQuery();
  }
}
