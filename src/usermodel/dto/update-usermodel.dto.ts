// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateUsermodelDto } from './create-usermodel.dto';

export class UpdateUsermodelDto extends PartialType(CreateUsermodelDto) {}
