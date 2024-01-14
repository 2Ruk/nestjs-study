import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from '@api/board/board.repository';
import { BoardLikeRepository } from '@api/board/board-like.repository';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, BoardLikeRepository],
})
export class BoardModule {}
