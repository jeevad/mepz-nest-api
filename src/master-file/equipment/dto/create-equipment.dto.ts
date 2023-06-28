import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EquipmentPackageDto } from './equipment-package.dto';
import { EquipmentPowerDto } from './equipment-power.dto';
import { EquipmentlabelDto } from './equipment-label.dto';

export class CreateEquipmentDto {
 
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  fileOne: string;
  
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  cost: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  markUp: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  heatDissipation: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  ictPort: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })

  @IsNotEmpty()
  bssPort: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  remarks: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  utility: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  labels: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // filePath: string;

  @ApiProperty({
    type: EquipmentPackageDto,
    description: 'This is a optional property',
  })
  equipmentPackage: EquipmentPackageDto;

  @ApiProperty({
    type: EquipmentPowerDto,
    description: 'This is a optional property',
  })
  // equipmentPower: EquipmentPowerDto;
  equipmentPower: EquipmentPowerDto = new EquipmentPowerDto();

  @ApiProperty({
    type: EquipmentlabelDto,
    description: 'This is a optional property',
  })
  equipmentLabel: EquipmentlabelDto;

}
