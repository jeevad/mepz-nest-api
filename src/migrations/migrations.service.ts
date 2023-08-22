import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class MigrationsService {
  constructor(@InjectConnection('mysql') private connection: Connection) {}

  async doSomeQuery() {
    return  await this.connection.query('SELECT * FROM tb_group limit 5;');
  }
  getEntities() {}
}
