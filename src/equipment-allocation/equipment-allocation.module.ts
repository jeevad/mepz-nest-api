import { Module } from '@nestjs/common';
import { EquipmentAllocationService } from './equipment-allocation.service';
import { EquipmentAllocationController } from './equipment-allocation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EquipmentAllocation,
  EquipmentAllocationSchema,
} from 'src/schemas/equipmentAllocation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EquipmentAllocation.name,
        schema: EquipmentAllocationSchema,
      },
    ]),
  ],
  controllers: [EquipmentAllocationController],
  providers: [EquipmentAllocationService],
})
export class EquipmentAllocationModule {}
