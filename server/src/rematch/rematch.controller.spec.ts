import { Test, TestingModule } from '@nestjs/testing';
import { RematchController } from './rematch.controller';

describe('RematchController', () => {
  let controller: RematchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RematchController],
    }).compile();

    controller = module.get<RematchController>(RematchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
