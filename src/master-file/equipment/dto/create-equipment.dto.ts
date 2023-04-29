import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  equipmentCode: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(50)
  equipmentName: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(50)
  cost: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(50)
  markUp: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(50)
  heatDissipation: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(50)
  ictPort: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(50)
  bssPort: string;
}
