import { Module } from '@nestjs/common';
import { EquipmentBrandService } from './equipment-brand.service';
import { EquipmentBrandController } from './equipment-brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EquipmentBrand,
  EquipmentBrandSchema,
} from 'src/schemas/equipmentBrand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EquipmentBrand.name,
        schema: EquipmentBrandSchema,
      },
    ]),
  ],
  controllers: [EquipmentBrandController],
  providers: [EquipmentBrandService],
  exports: [EquipmentBrandService],
})
export class EquipmentBrandModule {}
