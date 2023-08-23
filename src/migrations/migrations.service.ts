import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DepartmentService } from 'src/master-file/department/department.service';
import { GroupService } from 'src/master-file/group/group.service';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationsService {
  constructor(
    @InjectDataSource('mysql') private connection: DataSource,
    private readonly groupService: GroupService,
    private readonly departmentService: DepartmentService,
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
