import {
    IsNotEmpty,
    IsString,
    IsNumber,
    MaxLength,
    MinLength,
} from 'class-validator';


export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    // @MinLength(20)
    code: string;

    @IsString()
    @IsNotEmpty()
    // @MinLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    // @MinLength(5)
    // @MaxLength(300)
    address1: string;

    // @IsNumber()
    // @IsNotEmpty()
    // zip: number;
}
