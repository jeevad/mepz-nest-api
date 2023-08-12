import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './master-file/company/company.module';
import { DepartmentModule } from './master-file/department/department.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoomsModule } from './master-file/rooms/rooms.module';
import { GroupModule } from './master-file/group/group.module';
import { UtilityModule } from './master-file/utility/utility.module';
import { PackageModule } from './master-file/package/package.module';
import { ClassificationModule } from './master-file/classification/classification.module';
import { CurrencyModule } from './master-file/currency/currency.module';
import { EquipmentModule } from './master-file/equipment/equipment.module';
import { ProjectModule } from './project/project.module';
import { AdmingroupModule } from './admingroup/admingroup.module';
import { EquipmentBrandModule } from './master-file/equipment-brand/equipment-brand.module';

import { AuthModule } from './auth/auth.module';
import { PastTransactionModule } from './project/past-transaction/past-transaction.module';
import { EquipmentAllocationModule } from './project/equipment-allocation/equipment-allocation.module';
import { CurrentTransactionModule } from './project/current-transaction/current-transaction.module';
import { EquipmentSummaryModule } from './project/equipment-summary/equipment-summary.module';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      autoIndex: true,
    }),
    AuthModule,
    UsersModule,
    AuthenticationModule,
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
    EquipmentBrandModule,
    EquipmentAllocationModule,
    EquipmentSummaryModule,
    CurrentTransactionModule,
    PastTransactionModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
