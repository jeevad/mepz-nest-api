import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createPdf } from '@saemhco/nestjs-html-pdf';
import path, { join } from 'path';
import { FilterEquipmentDto } from 'src/project/dto/filter-equipment.dto';
import { ProjectService } from 'src/project/project.service';
import { PaginationParams } from 'src/utils/paginationParams';
import { FilterReportDto } from './dto/filter-report.dto';
import Excel from 'exceljs';

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
    } else if (filterReportDto.reportType === 'equipment-location-listing-by-pages') {
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
        /*
	    results = await this.projectService.getAllEquipmentsByLocation(
      filterReportDto,
    );

      results.EquipmentItemlist = await this.getAllremove_duplicates(
        results.departments,
      );
     */
      console.log(results);
    } 
	else if (filterReportDto.reportType === 'equipment-listing-bq-with-price') {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
	var paginationParams=[];
	results = await this.projectService.getAllEquipments_unique_dsply(
      filterReportDto
    );
	results.EquipmentItemlist= results.results;
	/*	
	console.log("hhhhhhhh");
	console.log(results);
      results.EquipmentItemlist = await this.getAllremove_duplicates(
        results.departments,
      );
     */
	 console.log("DDDDDDDDDDDDDDD");
      console.log(results);
    } 
	else if (filterReportDto.reportType === 'disabled-equipment-listing-bq') {
         
    const results = await this.projectService.getAllDisabledEquipments(
      filterReportDto,
    );
	}
	else if (filterReportDto.reportType === 'disabled-equipment-listing-bq-with-price') {
         
    const results = await this.projectService.getAllDisabledEquipments(
      filterReportDto,
    );
	}
	else if (filterReportDto.reportType === 'equipment-listing-by-department') {
     
    results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
   
   //console.log(results); 
   //console.log(results.departments[1].rooms[0]); 
   interface Item {
  equipmentId: string;
  name: string;
  code: string;
  _id: string;
  quantity?: number; // Make sure qty property is optional as it's not present in all objects.
   }
   console.log("fffffffffffff"); 
   for(const element3 of results.departments) {
   for(const element2 of element3.rooms) {
    // element3.rooms.total_sum = sumQty(element2);
	console.log(element2);
	  let sum = 0;
	  
	for (const item of element2.equipments) {
    if (item.qty !== undefined) {
      sum += item.qty;
    }
	else {
	 sum += 1;
	}
    }
	
	element2.total_sum =sum;  /**/
	}
	}
	console.log(results.departments[1].rooms[0]); 
   // console.log(results.departments); 
    // const items: Item[] =
	 /* 
     results.Departments.forEach((items) => {
     var  sum = 0;
	// const items1 = items.room;
   // items1.forEach((item) => {
     //sum+ = item.quantity;
     sum  = sum + 1;
       console.log(items); 
     // });
    //items.sum_total = sum;
     });
     */
    // console.log(results); 
    

     } 
	else {
      results = await this.projectService
        .findOne(filterReportDto.projectId)
        .lean();
      console.log(results);
    }
    // return;

    const data = results;
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

  exportExcel() {
    const numbers: WeeklySalesNumbers[] = [
      { product: 'Product A', week1: 5, week2: 10, week3: 27 },
      { product: 'Product B', week1: 5, week2: 5, week3: 11 },
      { product: 'Product C', week1: 1, week2: 2, week3: 3 },
      { product: 'Product D', week1: 6, week2: 1, week3: 2 },
    ];
  }

  async generateSalesReport(weeklySalesNumbers: WeeklySalesNumbers[]) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sales Data');
    weeklySalesNumbers.forEach((data, index) => {
      worksheet.addRow({
        ...data,
        // productTotals: generateProductTotalsCell(worksheet, index + 1),
      });
    });
  }

  async expExcel() {
    type Country = {
      name: string;
      countryCode: string;
      capital: string;
      phoneIndicator: number;
    };

    const countries: Country[] = [
      {
        name: 'Cameroon',
        capital: 'Yaounde',
        countryCode: 'CM',
        phoneIndicator: 237,
      },
      {
        name: 'France',
        capital: 'Paris',
        countryCode: 'FR',
        phoneIndicator: 33,
      },
      {
        name: 'United States',
        capital: 'Washington, D.C.',
        countryCode: 'US',
        phoneIndicator: 1,
      },
      {
        name: 'India',
        capital: 'New Delhi',
        countryCode: 'IN',
        phoneIndicator: 91,
      },
      {
        name: 'Brazil',
        capital: 'Brasília',
        countryCode: 'BR',
        phoneIndicator: 55,
      },
      {
        name: 'Japan',
        capital: 'Tokyo',
        countryCode: 'JP',
        phoneIndicator: 81,
      },
      {
        name: 'Australia',
        capital: 'Canberra',
        countryCode: 'AUS',
        phoneIndicator: 61,
      },
      {
        name: 'Nigeria',
        capital: 'Abuja',
        countryCode: 'NG',
        phoneIndicator: 234,
      },
      {
        name: 'Germany',
        capital: 'Berlin',
        countryCode: 'DE',
        phoneIndicator: 49,
      },
    ];

    const exportCountriesFile = async () => {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Countries List');

      worksheet.columns = [
        { key: 'name', header: 'Name' },
        { key: 'countryCode', header: 'Country Code' },
        { key: 'capital', header: 'Capital' },
        { key: 'phoneIndicator', header: 'International Direct Dialling' },
      ];

      countries.forEach((item) => {
        worksheet.addRow(item);
      });

      const exportPath = path.resolve(__dirname, 'countries.xlsx');

      await workbook.xlsx.writeFile(exportPath);
    };

    exportCountriesFile();
  }
}
