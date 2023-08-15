import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './master-file/company/company.module';
import { DepartmentModule } from './master-file/department/department.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoomsModule } from './master-file/rooms/rooms.module';
import { GroupModule } from './master-file/group/group.module';
import { UtilityModule } from './master-file/utility/utility.module';
import { PackageModule } from './master-file/package/package.module';
import { ClassificationModule } from './master-file/classification/classification.module';
import { CurrencyModule } from './master-file/currency/currency.module';
import { EquipmentModule } from './master-file/equipment/equipment.module';
import { ProjectModule } from './project/project.module';
import { EquipmentBrandModule } from './master-file/equipment-brand/equipment-brand.module';

import { AuthModule } from './auth/auth.module';
import { PastTransactionModule } from './project/past-transaction/past-transaction.module';
import { EquipmentAllocationModule } from './project/equipment-allocation/equipment-allocation.module';
import { CurrentTransactionModule } from './project/current-transaction/current-transaction.module';
import { EquipmentSummaryModule } from './project/equipment-summary/equipment-summary.module';
import { ReportsModule } from './reports/reports.module';
import { AdmingroupModule } from './administrator/admingroup/admingroup.module';
import { UsersModule } from './administrator/users/users.module';
import { AccessLevelModule } from './administrator/access-level/access-level.module';
import { ActivityLogsModule } from './administrator/activity-logs/activity-logs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './utils/logging.ineterceptor';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      autoIndex: true,
    }),
    ActivityLogsModule,
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
    AccessLevelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
