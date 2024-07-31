import { Test, TestingModule } from '@nestjs/testing';
import { GameModesService } from './game-modes.service';

describe('GameModesService', () => {
  let service: GameModesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameModesService],
    }).compile();

    service = module.get<GameModesService>(GameModesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
