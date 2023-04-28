// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateProjecttemplateDto } from './create-projecttemplate.dto';

export class UpdateProjecttemplateDto extends PartialType(
  CreateProjecttemplateDto,
) {}
