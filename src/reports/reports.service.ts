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

import * as fs from 'fs';
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
    // return;


 
    const results = await this.getQueryData(filterReportDto);
    console.log("helllov90000");
    console.log(results);
    
 

    const data: any = results;
    if(results)
    {
    data.currentDate = await this.getCurrentDate();
    data.pagewise = filterReportDto.pagewise;
    data.w_sign = filterReportDto.w_sign;
    }
    
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
      const total = 0;
      const room_info = [];
      const rooms = [];
      const total_equ_array = [];
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
  async xlExport(res, filterReportDto: FilterReportDto) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report', {
      headerFooter: {
        firstHeader: 'Hello Exceljs',
        firstFooter: 'Hello World',
      },
    });

    worksheet.addTable({
      name: 'MyTable',
      ref: 'A1',
      headerRow: true,
      totalsRow: true,
      style: {
        theme: 'TableStyleDark3',
        showRowStripes: true,
      },
      columns: [
        { name: 'name', totalsRowLabel: 'Totals:', filterButton: true },
        { name: 'Amount', totalsRowFunction: 'sum', filterButton: false },
      ],
      rows: [
        [new Date('2019-07-20'), 70.1],
        [new Date('2019-07-21'), 70.6],
        [new Date('2019-07-22'), 70.1],
      ],
    });
    
    worksheet.addTable({
      name: 'MyTable2',
      ref: 'A10',
      headerRow: true,
      totalsRow: true,
      // style: {
      //   theme: 'TableStyleDark3',
      //   showRowStripes: true,
      // },
      columns: [
        { name: 'Date', totalsRowLabel: 'Totals:', filterButton: true },
        { name: 'Amount', totalsRowFunction: 'sum', filterButton: false },
      ],
      rows: [
        [new Date('2019-07-20'), 70.1],
        [new Date('2019-07-21'), 70.6],
        [new Date('2019-07-22'), 70.1],
      ],
    });

    return await workbook.xlsx.write(res);
    // return await workbook.xlsx.writeFile('newSaveeee.xlsx');
  }
  async xl(res, filterReportDto: FilterReportDto) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report', {
      headerFooter: {
        firstHeader: 'Hello Exceljs',
        firstFooter: 'Hello World',
      },
    });
    
    /*
    worksheet.addTable({
      name: 'MyTable',
      ref: 'A1',
      headerRow: true,
      totalsRow: true,
      style: {
        theme: 'TableStyleDark3',
        showRowStripes: true,
      },
      columns: [
        { name: 'name', totalsRowLabel: 'Totals:', filterButton: true },
        { name: 'Amount', totalsRowFunction: 'sum', filterButton: false },
      ],

      
      rows: [
        [new Date('2019-07-20'), 70.1],
        [new Date('2019-07-21'), 70.6],
        [new Date('2019-07-22'), 70.1],
      ],
    });
    */
    const results = await this.getQueryData(filterReportDto);
    const rowarray = [];

    console.log("ddddddddddd");
    console.log(results);
  
   

    const row =worksheet.addRow(['MNE SOLUTIONS']);
    const cell = row.getCell(1); 
    cell.font = { bold: true };
    worksheet.addRow(['MEDICAL EQUIPMENT CONSULTANCY SERVICE']);
    worksheet.addRow([]);
    worksheet.addRow([]);

    

    if (filterReportDto.reportType === 'equipment-location-listing') {

      const row5 = worksheet.addRow(['Project Name:'+results.equipments[0].project_name]);
      const cell5 = row5.getCell(1); 
      cell5.font = { bold: true };
  
      worksheet.addRow(['Revision No: 5.001*', '', '', 'Date:'+await this.getCurrentDate()]);
  
    let sub_total =0;
    results.equipments.forEach((item) => {
    worksheet.addRow([]);
    worksheet.addRow(['Equipment: ', item.eqp_code, item.eqp_name]);
    worksheet.addRow(['Dept Code: ', 'Department', 'Room Code','Room Name','Quantity','Group','Remarks']);
    let total =0;
    item.locations.forEach((item2) => {
    worksheet.addRow([item2.department_code, item2.department_name, item2.room_code, item2.room_name, item2.quantity]);
    if (typeof item2.quantity === 'number') {
    total+= item2.quantity;
    }
    });
    sub_total+=total;
    worksheet.addRow(['', '', '','Sub-total',total]);
    worksheet.addRow([]);
    worksheet.addRow([]);
 
   worksheet.addRow(['Total Equipments',sub_total]);

   });
    }
    else if (filterReportDto.reportType === 'department-list') {

      const row5 = worksheet.addRow(['Project Name:'+results.name]);
      const cell5 = row5.getCell(1); 
      cell5.font = { bold: true };
      worksheet.addRow(['Revision No: 5.001*', '', '', 'Date:'+await this.getCurrentDate()]);
  
      worksheet.addRow(['Department List']);
      worksheet.addRow([]);
      worksheet.addRow(['Dept Code: ', 'Department']);
     
      results.departments.forEach((item) => {
      worksheet.addRow([]);
      worksheet.addRow([item.code, item.name]);

      });
      
  
      }
      else if (filterReportDto.reportType === 'room-listing') {

        const row5 = worksheet.addRow(['Project Name:'+results.name]);
        const cell5 = row5.getCell(1); 
        cell5.font = { bold: true };
        worksheet.addRow(['Revision No: 5.001*', '', '', 'Date:'+await this.getCurrentDate()]);
    
        worksheet.addRow(['Room Listing']);
        worksheet.addRow([]);
        worksheet.addRow(['Dept Code: ', 'Department']);
       
        results.departments.forEach((item) => {
          worksheet.addRow(['Department: ', item.code,item.name]);
        item.rooms.forEach((item2) => {
            worksheet.addRow([item2.code, item2.name, item2.status]);
         
            });
        worksheet.addRow([]);
        
        //worksheet.addRow([item.code, item.name]);
  
        });

      }
      else if (filterReportDto.reportType === 'equipment-listing-bq') {

        const row5 = worksheet.addRow(['Project Name:'+results.name]);
        const cell5 = row5.getCell(1); 
        cell5.font = { bold: true };
        worksheet.addRow(['Revision No: 5.001*', '', '', 'Date:'+await this.getCurrentDate()]);
    
        worksheet.addRow(['Equipment Listing(BQ)']);
        worksheet.addRow([]);
        worksheet.addRow(['Code: ', 'Equipment','Qty','Group','Remarks']);
        let sub_total =0;
        results.EquipmentItemlist.forEach((item) => {
        
            worksheet.addRow([item.code, item.name, item.quantity, item.group, item.remarks]);
         
        worksheet.addRow([]);
        if (typeof item.quantity === 'number') {
        sub_total+=item.quantity;
        }
        //worksheet.addRow([item.code, item.name]);
  
        });
        worksheet.addRow([]);
 
        worksheet.addRow(['Total Equipments:'+sub_total]);

      }
      

   
  

    

    

    return await workbook.xlsx.write(res);
    // return await workbook.xlsx.writeFile('newSaveeee.xlsx');
  }

  async getQueryData(filterReportDto: FilterReportDto) {
    let results: any;
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
    if (filterReportDto.reportType === 'equipment-location-listing') {
      const equipments = await this.getAllEqp(filterReportDto);
     
      results = { equipments };

      console.log(results);
     
    } else if (
      filterReportDto.reportType === 'equipment-location-listing-by-pages'
    ) {
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
        results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
      results = await this.projectService.getAllEquipments_unique_dsply(
        filterReportDto,
      );
      results.EquipmentItemlist = results.results;
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
    } 
    else if (filterReportDto.reportType === 'equipment-location-listing-by-group') {
	   
	   
	    const results_val = await this.projectService.getAllEquipmentslocationbygroup(filterReportDto);
		
		 results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
		
		
		}
		else if (filterReportDto.reportType === 'equipment-listing-bq-with-utility') {
	   
	   
		
		const results_val = await this.projectService.getAllEquipmentswithUtility(filterReportDto);
		
    results =results_val[0];
    console.log(results_val);
		results.top_logo = filterReportDto.top_logo; 
		results.b_logo = filterReportDto.b_logo; 
		results.medical_logo = filterReportDto.medical_logo; 
		results.medical_logo2 = filterReportDto.medical_logo2; 
		results.medical_logo3 = filterReportDto.medical_logo3; 
	
		
		}
		else if (filterReportDto.reportType === 'equipment-listing-by-department-and-room-with-utility') {
	   
	   
	    const results_val = await this.projectService.getAllEquipmentswithUtility(filterReportDto);
		
		   results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
		results.pagewise = filterReportDto.pagewise; 
		results.top_logo = filterReportDto.top_logo; 
		results.b_logo = filterReportDto.b_logo; 
		results.medical_logo = filterReportDto.medical_logo; 
		results.medical_logo2 = filterReportDto.medical_logo2; 
		results.medical_logo3 = filterReportDto.medical_logo3;
		
		console.log("Helooo");
		console.log(results.departments[1].rooms[1]);
		
		}
    else {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();

      console.log(results);
    }
    return results;
  }
}
