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
    // @MinLength(20)
    username: string;

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
    // @MinLength(20)
    staffid: number;

    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    @IsBoolean()
    @IsNotEmpty()
    // @MinLength(20)
    admin: boolean;

    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    @IsBoolean()
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

// export default CreateUserDto;
