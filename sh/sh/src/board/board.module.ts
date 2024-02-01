import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from '@api/board/board.repository';
import { BoardLikeRepository } from '@api/board/board-like.repository';
import { ReplyService } from '@api/board/reply.service';
import { ReplyController } from '@api/board/reply.controller';
import { ReplyRepository } from '@api/board/reply.repository';
import { ReplyLikeRepository } from '@api/board/reply-like.repository';
import { ValidateService } from '@api/board/validator/validate.service';

@Module({
  controllers: [BoardController, ReplyController],
  providers: [
    BoardService,
    ReplyService,
    ValidateService,
    BoardRepository,
    BoardLikeRepository,
    ReplyRepository,
    ReplyLikeRepository,
  ],
})
export class BoardModule {}
