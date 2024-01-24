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

  async likeReply({
    replyId,
    userId,
    boardId,
  }: ReplyLikeInput): Promise<void> {}

  async unlikeReply({
    replyId,
    userId,
    boardId,
  }: ReplyLikeInput): Promise<void> {}

  private async checkReplyLikeExist({
    replyId,
    userId,
    boardId,
  }: ReplyLikeInput): Promise<boolean> {
    return true;
  }
}
