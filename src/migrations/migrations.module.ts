import { Module } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { MigrationsController } from './migrations.controller';
import { UsersModule } from 'src/administrator/users/users.module';
import { CompanyModule } from 'src/master-file/company/company.module';
import { RoomsModule } from 'src/master-file/rooms/rooms.module';
import { GroupModule } from 'src/master-file/group/group.module';
import { DepartmentModule } from 'src/master-file/department/department.module';
import { UtilityModule } from 'src/master-file/utility/utility.module';
import { PackageModule } from 'src/master-file/package/package.module';
import { ClassificationModule } from 'src/master-file/classification/classification.module';
import { CurrencyModule } from 'src/master-file/currency/currency.module';
import { EquipmentModule } from 'src/master-file/equipment/equipment.module';
import { AdmingroupModule } from 'src/administrator/admingroup/admingroup.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    UsersModule,
    CompanyModule,
    RoomsModule,
    GroupModule,
    DepartmentModule,
    UtilityModule,
    PackageModule,
    ClassificationModule,
    CurrencyModule,
    EquipmentModule,
    ProjectModule,
    AdmingroupModule,
    // EquipmentBrandModule,
  ],
  controllers: [MigrationsController],
  providers: [MigrationsService],
})
export class MigrationsModule {}
