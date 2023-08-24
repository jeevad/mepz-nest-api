import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DepartmentService } from 'src/master-file/department/department.service';
import { GroupService } from 'src/master-file/group/group.service';
import { RoomsService } from 'src/master-file/rooms/rooms.service';
import { CurrencyService } from 'src/master-file/currency/currency.service';
import { CompanyService } from 'src/master-file/company/company.service';
import { UtilityService } from 'src/master-file/utility/utility.service';
import { EquipmentService } from 'src/master-file/equipment/equipment.service';
import { PackageService } from 'src/master-file/package/package.service';
import { ClassificationService } from 'src/master-file/classification/classification.service';
import { EquipmentBrandService } from 'src/master-file/equipment-brand/equipment-brand.service';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationsService {
  constructor(
    @InjectDataSource('mysql') private connection: DataSource,
    private readonly groupService: GroupService,
    private readonly departmentService: DepartmentService,
    private readonly roomsService: RoomsService,
    private readonly currencyService: CurrencyService,
    private readonly companyService: CompanyService,
    private readonly utilityService: UtilityService,
    private readonly equipmentService: EquipmentService,
    private readonly packageService: PackageService,
    private readonly classificationService: ClassificationService,
    private readonly equipmentBrandService: EquipmentBrandService,
    
  ) {}

  async migrateGroup() {
    const results = await this.connection.query(
      'SELECT g_code as code, g_desc as name, inactive as active, date_created as createdAt FROM tb_group',
    );
    results.forEach((element) => {
      element.active = !element.active;
      this['groupService'].create(element);
    });
    console.log('result', results);

    return results;
  }

  async runMasterTable() {
    const tables = [
      {
        name: 'tb_group',
        fields:
          'g_code as code, g_desc as name, inactive as active, date_created as createdAt',
        service: 'groupService',
      },
      {
        name: 'tb_department',
        fields:
          'dep_code as code, dep_desc as name, inactive as active, date_created as createdAt',
        service: 'departmentService',
      },
   /*   {
        name: 'tb_room',
        fields:
          'rm_code as code, rm_desc as name, inactive as active, date_created as createdAt',
        service: 'roomsService',
      },*/
      {
        name: 'tb_prj_currency',
        fields:
          'h_code as code, cur_code as name, cur_code as symbol, date_created as created',
        service: 'currencyService',
      },
      {
        name: 'tb_hs_company',
        fields:
          'com_code as code, com_name as name, cur_code as inactive, addr1 as address1, addr2 as address2, city, state, postal, country, pic_path as logo1, pic_path as show1, pic_path2 as logo2, pic_path2 as show2, pic_path3 as logo3, pic_path3 as show3, contact, tel_no as phone, mobile_no as mobile, fax_no as fax, emailadd as email, date_created as created',
        service: 'companyService',
      },
      {
        name: 'tb_utility',
        fields:
          'u_code as code, u_desc as name,  date_created as created',
        service: 'utilityService',
      },
      {
        name: 'tb_eq_package',
        fields:
          'pk_code as code, pk_desc as name, inactive as active,  date_created as created',
        service: 'packageService',
      },
      {
        name: 'tb_hosp_class',
        fields:
          'hcl_code as code, hcl_desc as name, inactive as active, date_created as created, date_created as createdAt',
        service: 'classificationService',
      },
      {
        name: 'tb_eq_gen_desc',
        fields:
        'gd_code as code, gd_desc as name, cost, markup_per as markUp, heat_dissipation as heatDissipation, ict_port as ictPort, bss_port as bssPort, date_created as createdAt, remarks, labels , utility, package , package_remarks as packageRemarks, package as equipmentPackage, labels as equipmentLabel, type_of_power as equipmentPower, file1 as fileOne',
        service: 'equipmentService',
      },
  
    ];
    tables.forEach(async (table) => {
      await this.runMasterCreateQuery(table);
      console.log(`Table ${table.name} migrated`);
    });
    return { message: tables.length + ' table migrated' };
  }

  async runMasterCreateQuery(table) {
    const results = await this.connection.query(
      `SELECT ${table.fields} FROM ${table.name}`,
    );
    results.forEach((element) => {
      element.active = !element.active;
      this[table.service].create(element);
    });

    return 'success';
  }

  async migrateDepartment() {
    interface OriginalObject {
      dep_code: number;
      dep_desc: string;
      inactive: number;
      date_created: string;
    }

    const results = await this.connection.query(
      'SELECT * FROM tb_department ;',
    );
    //console.log('result', results);
    const originalArray: OriginalObject[] = results;
    const newArray = originalArray.map(
      ({ dep_code, dep_desc, inactive, date_created }) => ({
        code: dep_code,
        name: dep_desc,
        active: inactive === 1 ? false : true,
        createdAt: date_created,
        updatedAt: date_created,
      }),
    );

    console.log(newArray);

    return newArray;
  }
}
