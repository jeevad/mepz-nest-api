import { Controller, Get, Query, Res, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/utils/paginationParams';
import { FilterReportDto } from './dto/filter-report.dto';

@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('pdf')
  @ApiOperation({ summary: 'pdf example' })
  async generatePdf2(@Res() res) {
    const buffer = await this.reportsService.secondExample();
    res.set(this.reportsService.getPdfHeader('test', buffer));
    res.end(buffer);
  }

  //Get common reports
  @Get('getEquipmentReports')
  @ApiOperation({ summary: 'get rooms by project id' })
  async getEquipmentReports(
    @Query() filterReportDto: FilterReportDto,
    @Res() res,
  ) {
    const results: any = await this.reportsService.getEquipmentReports(
      filterReportDto,
    );

    // return results;
    // res.set(
    //   this.reportsService.getPdfHeader(filterReportDto.reportType, results),
    // );
    res.end(results);
  }

  //Get Rooms by projectId
  @Get('getAllEquipments/:projectId')
  @ApiOperation({ summary: 'get rooms by project id' })
  async getAllEquipments(
    @Query() paginationParams: PaginationParams,
    @Param('projectId') projectId: string,
    @Res() res,
  ) {
    const results: any = await this.reportsService.getEquipmentList(
      paginationParams,
      projectId,
    );

    // return results;
    res.set(this.reportsService.getPdfHeader('equipment-list', results));
    res.end(results);
  }
}
