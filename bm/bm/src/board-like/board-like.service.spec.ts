import { Test, TestingModule } from '@nestjs/testing';
import { BoardLikeService } from './board-like.service';

describe('BoardLikeService', () => {
  let service: BoardLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardLikeService],
    }).compile();

    service = module.get<BoardLikeService>(BoardLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
