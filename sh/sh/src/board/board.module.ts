import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from '@api/board/board.repository';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
