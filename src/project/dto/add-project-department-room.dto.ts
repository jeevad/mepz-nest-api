import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AddProjectDepartmentRoomDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

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

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsNotEmpty()
  // alias: string;

  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsNotEmpty()
  // active: boolean;
}
