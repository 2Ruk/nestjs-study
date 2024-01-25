import { Injectable } from '@nestjs/common';
import { ReplyLikeRepository } from '@api/reply/reply-like.repository';
export interface ReplyLikeInput {
  boardId: number;
  replyId: number;
  userId: number;
}

@Injectable()
export class ReplyLikeService {
  constructor(private readonly replyLikeRepository: ReplyLikeRepository) {}

  async likeReply({ replyId, userId, boardId }: ReplyLikeInput): Promise<void> {
    const isReplyLikeExist = await this.checkReplyLikeExist({
      replyId,
      userId,
      boardId,
    });
    if (isReplyLikeExist) {
      return;
    }

    // 좋아요를 추가합니다.
    await this.replyLikeRepository.save({
      reply: {
        id: replyId,
      },
      user: {
        id: userId,
      },
    });
  }

  async unlikeReply({
    replyId,
    userId,
    boardId,
  }: ReplyLikeInput): Promise<void> {
    const isReplyLikeExist = await this.checkReplyLikeExist({
      replyId,
      userId,
      boardId,
    });
    if (!isReplyLikeExist) {
      return;
    }

    // 좋아요를 삭제합니다.
    await this.replyLikeRepository.delete({
      reply: {
        id: replyId,
      },
      user: {
        id: userId,
      },
    });
  }

  private async checkReplyLikeExist({
    replyId,
    userId,
    boardId,
  }: ReplyLikeInput): Promise<boolean> {
    const liked = await this.replyLikeRepository.findOne({
      where: {
        reply: {
          id: replyId,
        },
        user: {
          id: userId,
        },
      },
    });

    return Boolean(liked);
  }
}
