import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createPdf } from '@saemhco/nestjs-html-pdf';
import { join } from 'path';
import { FilterEquipmentDto } from 'src/project/dto/filter-equipment.dto';
import { ProjectService } from 'src/project/project.service';
import { PaginationParams } from 'src/utils/paginationParams';

@Injectable()
export class ReportsService {
  constructor(
    private projectService: ProjectService
  ) { }

  getPdfHeader(filename = 'pdf', buffer) {
    return {
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}.pdf`,
      // 'Content-Length': buffer.length,
      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    };
  }

  // async getRoomList(
  //   filterEquipmentDto: FilterEquipmentDto,
  //   paginationParams: PaginationParams,
  // ) {
  //   const rooms = await this.projectService.getAllRooms(
  //     filterEquipmentDto,
  //     paginationParams,
  //   );
  //   console.log("romms >>",rooms);
  //   return rooms;
  // }

  secondExample() {
    const data = {
      title: 'My PDF file',
      status: 'paid',
      invoiceId: '#123-123',
      customerName: 'Saúl Escandón',
      customerAddress: '1234 Main St',
      customerCity: 'Huánuco',
      customerState: 'Huánuco',
      customerCountry: 'Perú',
      customerPhone: '555-555-5555',
      items: [
        {
          description: 'custom suit',
          detail: {
            color: 'blue',
            size: '42',
          },
          price: {
            price0: 1500.0,
            price: 1050.0,
            save: 25,
          },
          quantity: 1,
          image:
            'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp',
        },
        {
          description: 'playstation 5',
          detail: {
            color: 'white',
            size: '45cmx45cm',
          },
          price: {
            price0: 500.0,
            price: 250.0,
            save: 50,
          },
          quantity: 2,
          image:
            'https://promart.vteximg.com.br/arquivos/ids/931599-1000-1000/image-b08a9ed36e114598bc56d7d4a5e7dd2d.jpg?v=637569550232800000',
        },
      ],
      subTotal: 1550.0,
      shipping: 15.0,
      total: 1565.0,
    };
    const options = {
      format: 'A4',
      displayHeaderFooter: true,
      margin: {
        left: '10mm',
        top: '25mm',
        right: '10mm',
        bottom: '15mm',
      },
      headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px; color: #0d76ba;">MEPS</span><br><span class="date" style="font-size:15px"><span></div>`,
      footerTemplate:
        '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      landscape: true,
    };
    const filePath = join(process.cwd(), 'views/reports', 'pdf-invoice.hbs');
    return createPdf(filePath, options, data);
  }

  async getDepartmentList(
    projectId: string,
    skip: number,
    limit: number,
    startId: string,
    searchQuery: string,
  ) {
    const department = await this.projectService.getDepartments(
      projectId,
      skip,
      limit,
      startId,
      searchQuery,
    );
    // return department;
    const data = department.results[0];
    const options = {
      format: 'A4',
      displayHeaderFooter: true,
      margin: {
        left: '10mm',
        top: '25mm',
        right: '10mm',
        bottom: '15mm',
      },
      headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px; color: #0d76ba;">MEPS</span><br><span class="date" style="font-size:15px"><span></div>`,
      footerTemplate:
        '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      landscape: true,
    };
    const filePath = join(process.cwd(), 'views/reports', 'department-list-report.hbs');
    return createPdf(filePath, options, data);
  }

  async getRoomList(
    // paginationParams: PaginationParams,
    projectId: string,
  ) {
    const rooms = await this.projectService.getRoomListReport(
      // paginationParams,
      projectId,
    );
    const data = rooms.results[0].data[0];
    const options = {
      format: 'A4',
      displayHeaderFooter: true,
      margin: {
        left: '10mm',
        top: '25mm',
        right: '10mm',
        bottom: '15mm',
      },
      headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px; color: #0d76ba;">MEPS</span><br><span class="date" style="font-size:15px"><span></div>`,
      footerTemplate:
        '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      landscape: true,
    };
    const filePath = join(process.cwd(), 'views/reports', 'room-list-report.hbs');
    return createPdf(filePath, options, data);
  }
}
