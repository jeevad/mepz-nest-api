// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateAdmingroupDto } from './create-admingroup.dto';

export class UpdateAdmingroupDto extends PartialType(CreateAdmingroupDto) {}
