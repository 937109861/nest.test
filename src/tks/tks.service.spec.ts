import { Test, TestingModule } from '@nestjs/testing';
import { TksService } from './tks.service';

describe('TksService', () => {
  let service: TksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TksService],
    }).compile();

    service = module.get<TksService>(TksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
