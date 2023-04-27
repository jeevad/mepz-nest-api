import { Module } from '@nestjs/common';
import { AdmingroupService } from './admingroup.service';
import { AdmingroupController } from './admingroup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admingroup, AdmingroupSchema } from 'src/schemas/admingroup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admingroup.name,
        schema: AdmingroupSchema,
      },
    ]),
  ],
  controllers: [AdmingroupController],
  providers: [AdmingroupService],
})
export class AdmingroupModule {}
