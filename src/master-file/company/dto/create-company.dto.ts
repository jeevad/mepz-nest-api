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
    // @MinLength(20)
    code: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    // @MinLength(50)
    name: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    // @MinLength(5)
    // @MaxLength(300)
    address1: string;

    // @IsNumber()
    // @IsNotEmpty()
    // zip: number;
}
