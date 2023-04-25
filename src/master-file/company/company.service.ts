import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from '../../schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyDocument> {
    const company = new this.companyModel(createCompanyDto);
    return company.save();
  }

  async findAll(): Promise<CompanyDocument[]> {
    return this.companyModel.find();
  }

  findOne(id: string) {
    return this.companyModel.findById(id);
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDocument> {
    return this.companyModel.findByIdAndUpdate(id, updateCompanyDto);
  }

  async remove(id: string) {
    return this.companyModel.findByIdAndRemove(id);
  }
}
