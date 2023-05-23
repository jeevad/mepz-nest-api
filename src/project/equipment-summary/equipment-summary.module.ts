import { Module } from '@nestjs/common';
import { EquipmentSummaryService } from './equipment-summary.service';
import { EquipmentSummaryController } from './equipment-summary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EquipmentSummary,
  EquipmentSummarySchema,
} from 'src/schemas/equipmentSummary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EquipmentSummary.name,
        schema: EquipmentSummarySchema,
      },
    ]),
  ],
  controllers: [EquipmentSummaryController],
  providers: [EquipmentSummaryService],
})
export class EquipmentSummaryModule {}
