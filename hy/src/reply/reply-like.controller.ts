import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ReplyLikeService } from '@api/reply/reply-like.service';
import { JwtGuard } from '@api/auth/jwt.guard';
import { CurrentUser } from '@api/library/decorator/current-user';
import { UserJwtPayload } from '@api/auth/auth.service';

@Controller('/board/:boardId/reply/:replyId/like')
export class ReplyLikeController {
  constructor(private readonly replyLikeService: ReplyLikeService) {}

  @UseGuards(JwtGuard)
  @Post()
  async likeBoard(@CurrentUser() { id: userId }: UserJwtPayload) {
    // return this.replyLikeService.likeReply(id);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async unlikeBoard(
    @Param('boardId') boardId: number,
    @Param('replyId') replyId: number,
    @CurrentUser() { id: userId }: UserJwtPayload,
  ) {
    // return this.replyLikeService.unlikeReply(boardId, replyId, userId);
  }
}
