import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationsService {
  constructor(@InjectDataSource('mysql') private connection: DataSource) {}

  async migrateGroup() {
    const results = await this.connection.query(
      'SELECT * FROM tb_group limit 5;',
    );
    console.log('result', results);

    return results;
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
    const newArray = originalArray.map(({ dep_code, dep_desc,inactive ,date_created }) => ({
      code: dep_code,
      name: dep_desc,
      active:  inactive === 1 ? false : true,
      createdAt: date_created,
      updatedAt: date_created,
    }));
    
    console.log(newArray);

    return newArray;
  }


}
