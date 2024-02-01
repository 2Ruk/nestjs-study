import { Test, TestingModule } from '@nestjs/testing';
import { BoardLikeController } from './board-like.controller';
import { BoardLikeService } from './board-like.service';

describe('BoardLikeController', () => {
  let controller: BoardLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardLikeController],
      providers: [BoardLikeService],
    }).compile();

    controller = module.get<BoardLikeController>(BoardLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
