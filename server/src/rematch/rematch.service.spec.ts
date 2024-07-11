import { Test, TestingModule } from '@nestjs/testing';
import { RematchService } from './rematch.service';

describe('RematchService', () => {
  let service: RematchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RematchService],
    }).compile();

    service = module.get<RematchService>(RematchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
