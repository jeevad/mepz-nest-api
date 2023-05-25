import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  group: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  // @IsString()
  @IsNotEmpty()
  staffId: number;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  // @IsBoolean()
  @IsNotEmpty()
  admin: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  // @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  valid: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  remarks: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  reEnterPassword: string;
}

// export default CreateUserDto;
