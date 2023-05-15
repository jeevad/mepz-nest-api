import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  username: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  staffid: number;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  admin: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  active: boolean;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  valid: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  remarks: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  password: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  // @MinLength(20)
  reEnterPassword: string;
}

// export default RegisterDto;
