import { Test, TestingModule } from '@nestjs/testing';
import { UsermodelService } from './usermodel.service';

describe('UsermodelService', () => {
  let service: UsermodelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsermodelService],
    }).compile();

    service = module.get<UsermodelService>(UsermodelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
