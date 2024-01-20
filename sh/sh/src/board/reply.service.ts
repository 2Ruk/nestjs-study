import { BadRequestException, Injectable } from '@nestjs/common';
import { ReplyRepository } from '@api/board/reply.repository';
import { CreateReplyDto } from '@api/board/dto/create-reply.dto';
import { UpdateReplyDto } from '@api/board/dto/update-reply.dto';
import { ReplyLikeRepository } from '@api/board/reply-like.repository';
import { ValidateIds } from '@api/board/validator/validate-ids';
import { ValidateService } from '@api/board/validator/validate.service';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,
    private readonly replyLikeRepository: ReplyLikeRepository,
    private readonly validateService: ValidateService,
  ) {}

  async create(
    userId: number,
    boardId: number,
    createReplyDto: CreateReplyDto,
  ) {
    const validateIds: ValidateIds = { boardId: boardId };
    await this.validateService.existValidate(validateIds);

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
    const validateIds: ValidateIds = {
      boardId: boardId,
      replyId: replyId,
      userId: userId,
    };
    await this.validateService.existValidate(validateIds);
    await this.validateService.isOwner(validateIds);

    try {
      await this.replyRepository.update(replyId, updateReplyDto);
      return await this.replyRepository.findOneBy({ id: replyId });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(userId: number, boardId: number, replyId: number) {
    const validateIds: ValidateIds = {
      boardId: boardId,
      replyId: replyId,
      userId: userId,
    };
    await this.validateService.existValidate(validateIds);
    await this.validateService.isOwner(validateIds);

    try {
      await this.replyRepository.delete(replyId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAllByBoardId(boardId: number) {
    const validateIds: ValidateIds = { boardId: boardId };
    await this.validateService.existValidate(validateIds);

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
    const validateIds: ValidateIds = { boardId: boardId, replyId: replyId };
    await this.validateService.existValidate(validateIds);

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
    const validateIds: ValidateIds = { boardId: boardId, replyId: replyId };
    await this.validateService.existValidate(validateIds);

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
