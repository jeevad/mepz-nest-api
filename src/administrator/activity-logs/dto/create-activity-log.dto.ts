import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateActivityLogDto {
  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  @IsOptional()
  // @IsString()
  url: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//   })
//   @IsString()
//   request: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is a required property',
  })
  // @IsString()
  @IsOptional()
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
