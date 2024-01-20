import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from '@api/board/board.repository';
import { BoardLikeRepository } from '@api/board/board-like.repository';
import { ReplyService } from '@api/board/reply.service';
import { ReplyController } from '@api/board/reply.controller';
import { ReplyRepository } from '@api/board/reply.repository';

@Module({
  controllers: [BoardController, ReplyController],
  providers: [
    BoardService,
    ReplyService,
    BoardRepository,
    BoardLikeRepository,
    ReplyRepository,
  ],
})
export class BoardModule {}
