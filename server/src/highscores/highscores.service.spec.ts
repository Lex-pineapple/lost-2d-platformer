import { Test, TestingModule } from '@nestjs/testing';
import { HighscoresService } from './highscores.service';

describe('HighscoresService', () => {
  let service: HighscoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighscoresService],
    }).compile();

    service = module.get<HighscoresService>(HighscoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
