// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateRegistermodelDto } from './create-registermodel.dto';

export class UpdateRegistermodelDto extends PartialType(
  CreateRegistermodelDto,
) {}
