import { Controller, Get, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('getAllRooms')
  @ApiOperation({ summary: 'Get All Rooms' })
  async getAllRooms(@Res() res) {
    const buffer = await this.reportsService.secondExample();
    res.set({
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=pdf.pdf`,
      'Content-Length': buffer.length,
      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });
    res.end(buffer);
  }

  @Get('pdf')
  @ApiOperation({ summary: 'pdf example' })
  async generatePdf2(@Res() res) {
    const buffer = await this.reportsService.secondExample();
    res.set(this.reportsService.getPdfHeader('test', buffer));
    res.end(buffer);
  }
}
