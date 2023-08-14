import { Injectable } from '@nestjs/common';
import { CreateAccessLevelDto } from './dto/create-access-level.dto';
import { UpdateAccessLevelDto } from './dto/update-access-level.dto';

@Injectable()
export class AccessLevelService {
  create(createAccessLevelDto: CreateAccessLevelDto) {
    return 'This action adds a new accessLevel';
  }

  findAll() {
    return `This action returns all accessLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessLevel`;
  }

  update(id: number, updateAccessLevelDto: UpdateAccessLevelDto) {
    return `This action updates a #${id} accessLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessLevel`;
  }
}
