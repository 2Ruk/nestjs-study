import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardRepository } from '@api/board/board.repository';
import { ValidateIds } from '@api/board/validator/validate-ids';
import { BoardLikeRepository } from '@api/board/board-like.repository';
import { ReplyRepository } from '@api/board/reply.repository';
import { ReplyLikeRepository } from '@api/board/reply-like.repository';
import { Board } from '@api/board/entities/board.entity';
import { Reply } from '@api/board/entities/reply.entity';

@Injectable()
export class ValidateService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardLikeRepository: BoardLikeRepository,
    private readonly replyRepository: ReplyRepository,
    private readonly replyLikeRepository: ReplyLikeRepository,
  ) {}

  board: Board | undefined = undefined;
  reply: Reply | undefined = undefined;

  async existValidate(ids: ValidateIds) {
    if (ids.boardId !== undefined) {
      const board = await this.boardRepository.findOneBy({ id: ids.boardId });
      if (!board) {
        throw new BadRequestException('존재하지 않는 게시글입니다.');
      }

      if (ids.replyId !== undefined) {
        const reply = await this.replyRepository.findOneBy({
          id: ids.replyId,
          board: { id: ids.boardId },
        });
        if (!reply) {
          throw new BadRequestException('존재하지 않는 댓글입니다.');
        }

        this.reply = reply;
      }

      this.board = board;
    }
  }

  async isOwner(ids: ValidateIds) {
    let key = '';
    if (ids.userId !== undefined) {
      let user = undefined;
      if (this.reply !== undefined) {
        key = '댓글';
        user = await this.reply.user;
      } else if (this.board !== undefined) {
        key = '게시글';
        user = await this.board.user;
      }

      if (user?.id !== ids.userId) {
        throw new UnauthorizedException(
          `자신이 작성한 ${key}만 삭제할 수 있습니다.`,
        );
      }
    }
  }
}
