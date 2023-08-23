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
}
