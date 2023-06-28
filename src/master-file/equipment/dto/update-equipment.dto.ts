// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateEquipmentDto } from './create-equipment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  EquipmentPackage,
  EquipmentPackageSchema,
} from 'src/schemas/equipmentPackage.schema';
import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { EquipmentlabelDto } from './equipment-label.dto';
import { EquipmentPackageDto } from './equipment-package.dto';
import { EquipmentPowerDto } from './equipment-power.dto';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // code: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })

  // fileOne: string;


  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // name: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // cost: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // markUp: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // heatDissipation: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsNotEmpty()
  // ictPort: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })

  // @IsNotEmpty()
  // bssPort: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a optional property',
  // })
  // remarks: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a optional property',
  // })
  // utility: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a optional property',
  // })
  // labels: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // filePath: string;

  // @ApiProperty({
  //   type: EquipmentPackageDto,
  //   description: 'This is a optional property',
  // })
  // equipmentPackage: EquipmentPackageDto;

  // @ApiProperty({
  //   type: EquipmentPowerDto,
  //   description: 'This is a optional property',
  // })
  // equipmentPower: EquipmentPowerDto;

  // @ApiProperty({
  //   type: EquipmentlabelDto,
  //   description: 'This is a optional property',
  // })
  // equipmentLabel: EquipmentlabelDto;

}
