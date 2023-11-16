import { Test, TestingModule } from '@nestjs/testing';
import { TksController } from './tks.controller';

describe('TksController', () => {
  let controller: TksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TksController],
    }).compile();

    controller = module.get<TksController>(TksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
