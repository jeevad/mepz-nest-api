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
import { ProjectService } from 'src/project/project.service';
//import { EquipmentBrandService } from 'src/master-file/equipment-brand/equipment-brand.service';
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
    //private readonly equipmentBrandService: EquipmentBrandService,
    private readonly projectService: ProjectService,
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
      {
        name: 'tb_prj_currency',
        fields:
          'h_code as code, cur_code as name, cur_code as symbol, date_created as created',
        service: 'currencyService',
      },
      {
        name: 'tb_utility',
        fields: 'u_code as code, u_desc as name,  date_created as created',
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
        name: 'tb_room',
        fields:
          'rm_code as code, rm_desc as name, inactive as active, date_created as createdAt,0 as floor',
        service: 'roomsService',
      },
      /**/
      {
        name: 'tb_hs_company',
        fields:
          "com_code as code, com_name as name, inactive as inactive, addr1 as address1, addr2 as address2, city,  state as state, postal, country,IFNULL(pic_path, 'null') AS logo1, 0 as show1, IFNULL(pic_path2, 'null') as logo2, 0 as show2,IFNULL(pic_path3, 'null') as logo3, 0 as show3,IFNULL(mobile_no, '0000000000') as phone, IFNULL(mobile_no, '0000000000') as mobile, fax_no as fax, IFNULL(emailadd, 'null') as email, IFNULL(contact, 'Null') as contact, date_created as created",
        service: 'companyService',
      },
      {
        name: 'tb_eq_gen_desc',
        fields:
          'gd_code as code, gd_desc as name, cost,brands, markup_per as markUp, heat_dissipation as heatDissipation, ict_port as ictPort, bss_port as bssPort,  remarks, labels , utility, package , package_remarks as packageRemarks, package as equipmentPackage, labels as equipmentLabel, type_of_power as equipmentPower, file1 as fileOne,typical_power_consumption as typicalPowerConsumption,water,drainage,ventilation,gas,typical_weight,typical_floor_loading,typical_ceiling_loading,radiation_shielding,corridor_clearance,control_room,tech_room,chiller,file2,file3',
        //date_created as createdAt, typicalPowerConsumption
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
      if (table.name == 'tb_eq_gen_desc') {
        element.equipmentPackage = {
          package: element.package,
          packageRemarks: element.package_remarks,
        };
        element.equipmentPower = {
          heatDissipationPower: element.heat_dissipation,
          data: element.heat_dissipation,
          bss: element.bss_port,
          typicalPowerConsumption: element.typicalPowerConsumption,
          typeOfPower: element.equipmentPower,
          waterInlet: element.water,
          drainage: element.drainage,
          ventilationExhaust: element.ventilation,
          medicalGas: element.gas,
          typicalWeight: element.typical_weight,
          typicalFloorLoading: element.typical_floor_loading,
          typicalCeilingLoading: element.typical_ceiling_loading,
          radiationShielding: element.radiation_shielding,
          corridorClearance: element.corridor_clearance,
          controlRoom: element.control_room,
          techRoom: element.tech_room,
          chiller: element.chiller,
          fileOne: element.fileOne,
          fileTwo: element.file2,
          fileThree: element.file3,
          powerRemarks: element.remarks,
        };
        element.equipmentLabel = {
          label: element.equipmentLabel,
          equipmentCode: element.code,
        };
        element.brands = { brands: element.brands };
      }
      element.active = !element.active;
      console.log('Testing1');
      console.log(element);
      this[table.service].create(element);
    });

    return 'success';
  }
  async migrateProject() {
    const projects = await this.connection.query(
      "SELECT false as isTemplate, h_code as code,h_short_name as name,h_full_name as fullName ,owner as clientOwner ,contract_no as contractNo ,bed_no as noOfBeds ,hcl_code as classification ,type ,com_code as company ,signature1 ,signature2, date_created as createdAt , addr1 as address1, addr2 as address2, city , country, date_start as dateInitiatedProposal, postal as postalZip, date_end as proposedFacilityCompletionDate, state  FROM `tb_hosp_geninfo` WHERE `id` IN('4') ORDER BY `h_short_name`",
    );
    //SELECT false as isTemplate, h_code as code,h_short_name as name,h_full_name as fullName ,owner as clientOwner ,contract_no as contractNo ,bed_no as noOfBeds ,hcl_code as classification ,type ,com_code as company ,signature1 ,signature2, date_created as createdAt , addr1 as address1, addr2 as address2, city , country, date_start as dateInitiatedProposal, postal as postalZip, date_end as proposedFacilityCompletionDate, state  FROM `tb_hosp_geninfo` WHERE `id` IN('4', '140', '7', '42', '8', '9', '126', '148', '130', '83', '86', '127', '55', '11', '74', '81', '82', '51', '119', '35', '6', '13', '38', '132', '15', '12', '118', '18', '19', '117', '22', '142', '124', '121', '122', '70', '80', '50', '120', '147', '128', '103', '134', '137', '153', '72', '141', '139', '138', '99', '25', '37') ORDER BY `h_short_name`

    for (const element of projects) {
      const department = await this.get_department_by_id(element.code);
      element.departments = department;
      for (const element2 of department) {
        const rooms = await this.get_rooms_by_depart(element2.h_dep_id);
        element2.rooms = rooms;
        /*
        for (const element3 of rooms) {
          const equipment = await this.get_equipment_by_rooms(
            element.code,
            element3.rm_code,
          );
          element3.equipments = equipment;
        }
        */
      }
      let project_id = this['projectService'].create(element);

      for (const element2 of department) {
        const rooms = await this.get_rooms_by_depart(element2.h_dep_id);
        //element2.rooms = rooms;
        for (const element3 of rooms) {
          this.get_equipment_by_rooms(element, element2, element3, project_id);
        }
      }
    }

    //return projects;
    return 'success';
  }
  async get_department_by_id(h_code) {
    const department = await this.connection.query(
      "SELECT tb_prj_dept.h_dep_id as h_dep_id, tb_prj_dept.prj_dep_code as code, tb_prj_dept.prj_dep_desc as name, tb_prj_dept.date_created as createdAt FROM `tb_prj_dept` JOIN `tb_department` ON `tb_department`.`dep_code` = `tb_prj_dept`.`dep_code` WHERE `tb_prj_dept`.`h_code` ='" +
        h_code +
        "'",
    );

    return department;
  }
  async get_rooms_by_depart(h_dep_id) {
    //"SELECT  tb_prj_dept_line.prj_rm_desc as name ,tb_prj_dept_line.prj_rm_code as code ,tb_prj_dept_line.date_created as createdAt FROM `tb_prj_dept_line` JOIN `tb_room` ON `tb_prj_dept_line`.`rm_code` = `tb_room`.`rm_code` WHERE `tb_prj_dept_line`.`h_dep_id` ='"+h_dep_id+"'"
    const rooms = await this.connection.query(
      "SELECT tb_prj_dept_line.rm_code, tb_prj_dept_line.prj_rm_desc as name ,tb_prj_dept_line.prj_rm_code as code ,tb_prj_dept_line.date_created as createdAt FROM `tb_prj_dept_line` WHERE `tb_prj_dept_line`.`h_dep_id` ='" +
        h_dep_id +
        "'",
    );

    return rooms;
  }
  async get_equipment_by_rooms(element, element2, element3, project_id) {
    const equipment = await this.connection.query(
      "SELECT tb_prj_prop_line_tmp.qty as quantity, tb_eq_gen_desc.gd_desc as name, tb_prj_prop_line_tmp.gd_code as code, tb_prj_prop_line_tmp.apq as apq, tb_eq_gen_desc.cost as cost, tb_prj_prop_line_tmp.date_created as updatedAt, tb_prj_dept.floorlevel_tx as floor FROM `tb_prj_dept` JOIN `tb_prj_dept_line` ON `tb_prj_dept_line`.`h_dep_id` = `tb_prj_dept`.`h_dep_id` LEFT JOIN `tb_prj_prop_line_tmp` ON `tb_prj_prop_line_tmp`.`h_dep_line` = `tb_prj_dept_line`.`h_dep_line` LEFT JOIN `tb_eq_gen_desc` ON `tb_eq_gen_desc`.`gd_code` = `tb_prj_prop_line_tmp`.`gd_code` WHERE `tb_prj_dept`.`h_code` = '" +
        element.code +
        "' AND `tb_prj_dept_line`.`disabled` =0  AND `tb_prj_dept_line`.`rm_code` ='" +
        element3.rm_code +
        "' ORDER BY `tb_prj_dept`.`prj_dep_desc`, `tb_prj_dept_line`.`prj_rm_desc`, `tb_eq_gen_desc`.`gd_desc`",
    );
    for (const element_equ of equipment) {
      element_equ.projectId = project_id;
      element_equ.projectCode = element.h_code;
      element_equ.projectName = element.name;;
      // element_equ.departmentId = project_id;
      element_equ.departmentCode = element2.h_dep_id;
      element_equ.departmentName = element2.h_dep_id;;
      //element_equ.roomId = element3.rm_code;
      element_equ.roomCode = element3.rm_code;
      element_equ.roomName = element3.anme;
      this['projectService'].createProjectEquipment(element_equ);
      console.log(element_equ);
    }

    //floor
    //"SELECT `tb_prj_prop_line_tmp`.`gd_code`, `tb_prj_prop_line_tmp`.`qty` as quantity, `tb_prj_prop_line_tmp`.`tmp_line_id`, `tb_prj_prop_line_tmp`.`date_created`, `tb_prj_prop_line_tmp`.`date_gd_code_replace`, `tb_prj_dept_line`.`prj_rm_code`, `tb_prj_dept_line`.`prj_rm_desc`, `tb_prj_dept_line`.`h_dep_line`, `tb_prj_dept`.`prj_dep_code`, `tb_prj_dept`.`prj_dep_desc`, `tb_prj_dept`.`h_dep_id`, `tb_prj_dept`.`floorlevel_tx`, `tb_eq_gen_desc`.`gd_desc` FROM `tb_prj_dept` JOIN `tb_prj_dept_line` ON `tb_prj_dept_line`.`h_dep_id` = `tb_prj_dept`.`h_dep_id` LEFT JOIN `tb_prj_prop_line_tmp` ON `tb_prj_prop_line_tmp`.`h_dep_line` = `tb_prj_dept_line`.`h_dep_line` LEFT JOIN `tb_eq_gen_desc` ON `tb_eq_gen_desc`.`gd_code` = `tb_prj_prop_line_tmp`.`gd_code` WHERE `tb_prj_dept`.`h_code` = '"+h_code+"' AND `tb_prj_dept_line`.`disabled` =0  AND `tb_prj_dept_line`.`rm_code` ='"+room_code+"' ORDER BY `tb_prj_dept`.`prj_dep_desc`, `tb_prj_dept_line`.`prj_rm_desc`, `tb_eq_gen_desc`.`gd_desc`"
    //
    return equipment;
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
