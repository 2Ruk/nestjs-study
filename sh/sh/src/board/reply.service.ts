import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ReplyRepository } from '@api/board/reply.repository';
import { CreateReplyDto } from '@api/board/dto/create-reply.dto';
import { UpdateReplyDto } from '@api/board/dto/update-reply.dto';
import { BoardRepository } from '@api/board/board.repository';
import { ReplyLikeRepository } from '@api/board/reply-like.repository';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,
    private readonly replyLikeRepository: ReplyLikeRepository,
    private readonly boardRepository: BoardRepository,
  ) {}

  async create(
    userId: number,
    boardId: number,
    createReplyDto: CreateReplyDto,
  ) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }

    const reply = this.replyRepository.create({
      ...createReplyDto,
      user: {
        id: userId,
      },
      board: {
        id: boardId,
      },
    });

    await this.replyRepository.save(reply);
  }

  async update(
    userId: number,
    boardId: number,
    replyId: number,
    updateReplyDto: UpdateReplyDto,
  ) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }

    const reply = await this.replyRepository.findOneBy({
      id: replyId,
      board: { id: boardId },
    });
    if (!reply) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    const user = await reply.user;
    if (user.id !== userId) {
      throw new UnauthorizedException(
        '자신이 작성한 댓글만 수정할 수 있습니다.',
      );
    }

    try {
      await this.replyRepository.update(replyId, updateReplyDto);
      return await this.replyRepository.findOneBy({ id: replyId });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(userId: number, boardId: number, replyId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }

    const reply = await this.replyRepository.findOneBy({
      id: replyId,
      board: { id: boardId },
    });
    if (!reply) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    const user = await reply.user;
    if (user.id !== userId) {
      throw new UnauthorizedException(
        '자신이 작성한 댓글만 삭제할 수 있습니다.',
      );
    }

    try {
      await this.replyRepository.delete(replyId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAllByBoardId(boardId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }

    try {
      return await this.replyRepository.find({
        where: { board: { id: boardId } },
        order: { id: 'DESC' },
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        `${boardId} 게시글의 댓글을 불러오는데 실패하였습니다.`,
      );
    }
  }

  async like(userId: number, boardId: number, replyId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글 입니다.');
    }

    const reply = await this.replyRepository.findOneBy({
      id: replyId,
      board: { id: boardId },
    });
    if (!reply) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    const like = await this.replyLikeRepository.findOneBy({
      reply: { id: replyId },
      user: { id: userId },
    });
    if (like) {
      throw new BadRequestException('이미 좋아요를 누른 댓글 입니다.');
    }

    const replyLike = this.replyLikeRepository.create({
      reply: {
        id: replyId,
      },
      user: {
        id: userId,
      },
    });

    await this.replyLikeRepository.save(replyLike);
  }

  async cancelLike(userId: number, boardId: number, replyId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글 입니다.');
    }

    const reply = await this.replyRepository.findOneBy({
      id: replyId,
      board: { id: boardId },
    });
    if (!reply) {
      throw new BadRequestException('존재하지 않는 댓글입니다.');
    }

    const like = await this.replyLikeRepository.findOneBy({
      reply: { id: replyId },
      user: { id: userId },
    });
    if (!like) {
      throw new BadRequestException('좋아요를 취소할 수 없는 댓글 입니다.');
    }

    await this.replyLikeRepository.delete(like.id);
  }
}
