import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
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
    type: Boolean,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  inactive: boolean;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  address1: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  address2: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  postal: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  logo1: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  show1: boolean;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  logo2: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  show2: boolean;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  logo3: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  show3: boolean;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  contact: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  mobile: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  fax: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  // @IsNumber()
  // @IsNotEmpty()
  // zip: number;
}
