import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateActivityLogDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  url: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//   })
//   @IsString()
//   request: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  method: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  pageName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsString()
  user: string;

  //   @ApiProperty({
  //     type: String,
  //     description: 'This is a required property',
  //   })
  //   @IsString()
  //   response: string;
}
