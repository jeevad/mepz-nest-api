import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class EquipmentPackageDto {
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  package: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  packageRemarks: string;
}
