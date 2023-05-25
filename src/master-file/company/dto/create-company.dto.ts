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
  @IsString()
  @IsNotEmpty()
  inactive: boolean;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  address1: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  address2: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  city: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  state: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  postal: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  country: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  logo1: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  show1: boolean;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // logo2: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  show2: boolean;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // logo3: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  show3: boolean;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  contact: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  phone: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  mobile: number;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  fax: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()

  // @MaxLength(300)
  email: string;

  // @IsNumber()
  // @IsNotEmpty()
  // zip: number;
}
