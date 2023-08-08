import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createPdf } from '@saemhco/nestjs-html-pdf';
import path, { join, resolve } from 'path';
import { FilterEquipmentDto } from 'src/project/dto/filter-equipment.dto';
import { ProjectService } from 'src/project/project.service';
import { PaginationParams } from 'src/utils/paginationParams';
import { FilterReportDto } from './dto/filter-report.dto';
import Excel, { Workbook } from 'exceljs';
import * as tmp from 'tmp';
import { writeFile } from 'fs/promises';
import { rejects } from 'assert';

interface WeeklySalesNumbers {
  product: string;
  week1: number;
  week2: number;
  week3: number;
}

@Injectable()
export class ReportsService {
  reportType = {};

  constructor(private projectService: ProjectService) {}

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
      headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px; color: #0d76ba;">Hanimeds</span><br><span class="date" style="font-size:15px"><span></div>`,
      footerTemplate:
        '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      landscape: true,
    };
    const filePath = join(process.cwd(), 'views/reports', 'pdf-invoice.hbs');
    return createPdf(filePath, options, data);
  }

  async getEquipmentList(
    paginationParams: PaginationParams,
    projectId: string,
  ) {
    const filterEquipmentDto: any = { projectId: [projectId] };
    const results = await this.projectService.getAllEquipments(
      filterEquipmentDto,
      paginationParams,
    );
    console.log('results', results.results[0].data);

    const data = results.results[0];
    // console.log(data);
    // return data;
    const options = {
      format: 'A4',
      displayHeaderFooter: true,
      margin: {
        left: '10mm',
        top: '25mm',
        right: '10mm',
        bottom: '15mm',
      },
      headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px; color: #0d76ba;">Hanimeds</span><br><span class="date" style="font-size:15px"><span></div>`,
      footerTemplate:
        '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      landscape: true,
    };
    const filePath = join(
      process.cwd(),
      'views/reports',
      'eqp-list-report.hbs',
    );
    return createPdf(filePath, options, data);
  }

  async getEquipmentReports(filterReportDto: FilterReportDto) {
    let results: any;
    if (filterReportDto.reportType === 'equipment-location-listing') {
      type EquipmentItem = {
        _id: string;
        code: string;
        name: string;
        project_code: string;
        project_name: string;
        room_code: string;
        room_name: string;
        department_code: string;
        department_name: string;
        qty1: number;
        totalequ: number;
        total?: number;
      };

      const equipments = await this.getAllEqp(filterReportDto);
      // results = await this.projectService.getAllEquipmentsByLocation(
      //   filterReportDto,
      // );
      results = { equipments };
      // results = { equipments: ['test', 'ere', 'dfdf'] };
    } else if (
      filterReportDto.reportType === 'equipment-location-listing-by-pages'
    ) {
      type EquipmentItem = {
        _id: string;
        code: string;
        name: string;
        project_code: string;
        project_name: string;
        room_code: string;
        room_name: string;
        department_code: string;
        department_name: string;
        qty1: number;
        totalequ: number;
        total?: number;
      };

      const equipments = await this.getAllEqp(filterReportDto);
      // results = await this.projectService.getAllEquipmentsByLocation(
      //   filterReportDto,
      // );
      results = { equipments };

      // results = { equipments: ['test', 'ere', 'dfdf'] };
    } else if (filterReportDto.reportType === 'equipment-listing-bq') {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
    } else if (
      filterReportDto.reportType === 'equipment-listing-bq-with-price'
    ) {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
      results = await this.projectService.getAllEquipments_unique_dsply(
        filterReportDto,
      );
      results.EquipmentItemlist = results.results;
      /*	
	console.log("hhhhhhhh");
	console.log(results);
      results.EquipmentItemlist = await this.getAllremove_duplicates(
        results.departments,
      );
     */
      console.log('DDDDDDDDDDDDDDD');
      console.log(results);
    } else if (filterReportDto.reportType === 'disabled-equipment-listing-bq') {
      const results = await this.projectService.getAllDisabledEquipments(
        filterReportDto,
      );
    } else if (
      filterReportDto.reportType === 'disabled-equipment-listing-bq-with-price'
    ) {
      const results = await this.projectService.getAllDisabledEquipments(
        filterReportDto,
      );
    } else if (
      filterReportDto.reportType === 'equipment-listing-by-department'
    ) {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();

      results.departments.forEach((item) => {
        item.pagewise = filterReportDto.pagewise;
      });
    } else if (
      filterReportDto.reportType ===
      'equipment-listing-by-department-with-price'
    ) {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
    } else if (
      filterReportDto.reportType === 'equipment-listing-by-department-and-room'
    ) {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
      results.departments.forEach((item) => {
        item.pagewise = filterReportDto.pagewise;

        if (item.departmentId) {
          item.rooms.forEach((item_r) => {
            item_r.pagewise = filterReportDto.pagewise;
            item_r.w_sign = filterReportDto.w_sign;
          });
        }
      });

      console.log(results.departments[1]);
    } else if (
      filterReportDto.reportType ===
      ' equipment-listing-by-department-and-room-with-price'
    ) {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
      results.departments.forEach((item) => {
        item.pagewise = filterReportDto.pagewise;

        if (item.departmentId) {
          item.rooms.forEach((item_r) => {
            item_r.pagewise = filterReportDto.pagewise;
            item_r.w_sign = filterReportDto.w_sign;
          });
        }
      });

      console.log(results.departments[1]);
    } else if (
      filterReportDto.reportType ===
      'equipment-listing-by-department-and-room-disabled'
    ) {
      const results_val =
        await this.projectService.getAllDisabledEquipmentsbyroomdepart(
          filterReportDto,
        );
      results = results_val[0];
      console.log('Test');
      console.log(results);

      //console.log(results_val);

      /*
		results_val.forEach((item2) => {
		console.log("Helloooov4445555555555777777::::");
		//console.log(item2.departments.rooms);
		dep_arry.push(item2.departments);
		//project_code = item2.code;
		//project_name = item2.name;
		});
		//console.log("vineesh::::");
		//console.log(dep_arry);
		//results = { code:project_code, name: project_name, departments:dep_arry }
		
		console.log("Helloooov4445555555555::::");
		console.log(results.departments[0]);
		/*
		 results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
		console.log("HellooooVVVVVVVVVVVVVV::::");
		//console.log(results);
		//console.log(results.departments[1]);
		/*
		
		if(results.length)
		{
		results.forEach((item2) => {
		console.log(item2);
		console.log("Helloooo");
		console.log(item2.departments);
		if(item2.length)
		{
		item2.forEach((item) => {
		
		item.pagewise =filterReportDto.pagewise;
		
		if(item.departmentId)
		{
		 
	   item.rooms.forEach((item_r) => {
	   
	item_r.pagewise =filterReportDto.pagewise;
	item_r.w_sign =filterReportDto.w_sign;
	});
	}
     }
	 );
	 }
	 }
	 );
	 }
		*/
    } else if (
      filterReportDto.reportType ===
      'equipment-listing-by-department-and-room-disabled-price'
    ) {
      const results_val =
        await this.projectService.getAllDisabledEquipmentsbyroomdepart(
          filterReportDto,
        );
      results = results_val[0];
      console.log('Test');
      console.log(results);
    } else {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();

      console.log(results);
    }
    // return;

    const data = results;
    data.currentDate = await this.getCurrentDate();
    data.pagewise = filterReportDto.pagewise;
    data.w_sign = filterReportDto.w_sign;
    console.log(data);
    const options = {
      format: 'A4',
      displayHeaderFooter: true,
      margin: {
        left: '10mm',
        top: '25mm',
        right: '10mm',
        bottom: '15mm',
      },
      headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px; color: #0d76ba;">Hanimeds</span><br><span class="date" style="font-size:15px"><span></div>`,
      footerTemplate:
        '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      landscape: true,
    };
    const filePath = join(
      process.cwd(),
      'views/reports/common',
      `${filterReportDto.reportType}.hbs`,
    );
    //console.log('data', data);

    return createPdf(filePath, options, data);
  }
  async getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  async getAllremove_duplicates(department) {
    type EquipmentItem = {
      equipmentId: string;
      name: string;
      code: string;
      _id: string;
      total?: number;
    };
    const eqps = [];
    for (const element3 of department) {
      for (const element2 of element3.rooms) {
        for (const element of element2.equipments) {
          if (eqps[element._id] === undefined) {
            //eqps[element._id] = [];
          }
          console.log('ggggggelement' + element.code);
          eqps.push(element);
        }
      }
    }
    console.log('EquipmentList', eqps);
    const lists = [];
    //for (const element1 in eqps) {

    const items = eqps;

    console.log('items33333', items);
    const inputArray: EquipmentItem[] = eqps;
    //const uniqueItems: { [id: string]  } = {};

    const uniqueItems: { [id: string]: EquipmentItem } = {};
    items.forEach((item) => {
      if (uniqueItems[item.code]) {
        uniqueItems[item.code].total = (uniqueItems[item.code].total || 0) + 1;
      } else {
        uniqueItems[item.code] = { ...item, total: 1 };
      }
    });
    console.log('uniqueeitems', Object.values(uniqueItems));
    return Object.values(uniqueItems);
  }
  async getAllEqp(filterReportDto) {
    const results = await this.projectService.getAllEquipmentsByLocation(
      filterReportDto,
    );

    // console.log('results1234544444444444444', results);
    // return results;
    const eqps = [];
    for (const element of results) {
      if (eqps[element._id] === undefined) {
        eqps[element._id] = [];
      }

      const results2 = await this.projectService.getProjectEquipmentsbyroom(
        filterReportDto.projectId,
        element.room_id,
        element.code,
      );
      element.qty1 = Object.values(results2).length;

      //console.log('ele', results2);
      console.log('eleeeeeeeeeeeeeeeeeeeeeeeee', element);
      //console.log('ele', results2.results[0].metadata[0].total);
      element.totalequ = results2.results[0].metadata[0].total;
      //const results2 = await this.projectService.getProjectEquipmentsbyroom(filterReportDto.element.room_id);
      //console.log('eqps555', filterReportDto.projectId);
      //console.log('eqps555', filterReportDto);
      //element.qty1= Object.values(results2).length;
      eqps[element._id].push(element);

      // const results2 = await this.projectService.getProjectEquipmentsbyroom(filterReportDto.projectId,eqps[element][0].room_id);
      //console.log('eqps555', filterReportDto.projectId);
      //console.log('eqps555', filterReportDto);
      //eqps[element.qty1]= Object.values(results2).length;
    }
    // console.log('eqps', typeof eqps);
    // console.log('eqps1', eqps.length);
    //console.log('vineesh');
    console.log('eqps22222222222222222222222', eqps);
    const lists = [];
    for (const element1 in eqps) {
      // console.log('element', element1);
      //const results2 = await this.projectService.getProjectEquipmentsbyroom(filterReportDto.projectId,eqps[element1][0].room_id);
      //console.log('eqps555', filterReportDto.projectId);
      //console.log('eqps555', filterReportDto);
      //eqps[element1][0].qty1= Object.values(results2).length;
      //console.log('eqps555', Object.values(results2).length);
      //console.log('eqps[element1]', Object.keys(eqps[element1]));
      var total = 0;
      var room_info = [];
      var rooms = [];
      var total_equ_array = [];
      const items = eqps[element1];
      type EquipmentItem = {
        _id: string;
        code: string;
        name: string;
        project_code: string;
        project_name: string;
        room_code: string;
        room_name: string;
        department_code: string;
        department_name: string;
        qty1: number;
        totalequ: number;
        total?: number;
      };

      const inputArray: EquipmentItem[] = eqps[element1];
      //const uniqueItems: { [id: string]  } = {};

      const uniqueItems: { [id: string]: EquipmentItem } = {};
      items.forEach((item) => {
        if (uniqueItems[item.room_code]) {
          uniqueItems[item.room_code].total =
            (uniqueItems[item.room_code].total || 0) + 1;
        } else {
          uniqueItems[item.room_code] = { ...item, total: 1 };
        }
      });
      //console.log('tttttttttttt', Object.values(uniqueItems));
      /*

	   for (const element2 in eqps[element1]) {
      
	 
       if (rooms.includes(eqps[element1][element2].room_code)) {
         
       }
      else
       {
       var room_code1 =eqps[element1][0].code;
       var room_code =eqps[element1][element2].room_code;
       eqps[element1][element2].total=total+1;

        const myString = room_code;
       // data1[myString] = { room_code1: 1 };
        room_info.push(eqps[element1][element2]);
        rooms.push(eqps[element1][element2].room_code);
       }
	  //console.log('v4444777', room_info);
	  //console.log('v4444888', rooms);
	  //console.log('v4444888', data1);
     
	   } */
      console.log('length', Object.values(uniqueItems).length);
      //console.log('length', eqps[element1][0].code);
      //  if(Object.values(uniqueItems).length > 0)
      // {
      lists.push({
        project_name: eqps[element1][0].project_name,
        project_code: eqps[element1][0].project_code,
        eqp_code: eqps[element1][0].code,
        eqp_name: eqps[element1][0].name,
        sum: eqps[element1][0].totalequ,

        //locations: room_info,
        locations: Object.values(uniqueItems),
        total_equ: total_equ_array,
        //data1:data1,
      });
      //}
    }

    // results.forEach((element) => {
    //   if (eqps[element._id] === undefined) {
    //     eqps[element._id] = [];
    //   }
    //   // console.log('ele', element);

    //   eqps[element._id].push(element);
    // });
    // eqps.forEach();
    return lists;
  }

  async xl1(res) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 5 },
      { header: 'Title', key: 'title', width: 25 },
      { header: 'Description', key: 'description', width: 25 },
      { header: 'Published', key: 'published', width: 10 },
    ];

    const tutorials = [
      { id: 1, title: 'hghhg', description: 'hhjhjhj', published: 'hghgghhg' },
    ];

    // Add Array Rows
    worksheet.addRows(tutorials);

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    return await workbook.xlsx.write(res);
  }
  async xl(res, filterReportDto: FilterReportDto) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report');

    worksheet.mergeCells('C1', 'F1');
    worksheet.getCell('C1').value = 'Project';

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 5 },
      { header: 'Title', key: 'title', width: 25 },
      { header: 'Description', key: 'description', width: 25 },
      { header: 'Published', key: 'published', width: 10 },
    ];

    const tutorials = [
      { id: 1, title: 'hghhg', description: 'hhjhjhj', published: 'hghgghhg' },
      { id: 1, title: 'hghhg', description: '34ffdg', published: 'hghgghhg' },
    ];

    // Add Array Rows
    worksheet.addRows(tutorials);

    // worksheet.columns = [
    //   { header: 'Id', key: 'id', width: 5 },
    //   { header: 'Title', key: 'title', width: 25 },
    //   { header: 'Description', key: 'description', width: 25 },
    // ];

    // worksheet.addRows(tutorials);

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    return await workbook.xlsx.write(res);
    // return await workbook.xlsx.writeFile('newSaveeee.xlsx');
  }
}
