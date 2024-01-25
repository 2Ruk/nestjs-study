import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@api/library/decorator/current-user';
import { UserJwtPayload } from '@api/auth/auth.service';
import { JwtGuard } from '@api/auth/jwt.guard';
import { BoardLikeService } from '@api/board/board-like.service';

@Controller('/board/:boardId/like')
export class BoardLikeController {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @UseGuards(JwtGuard)
  @Post()
  async likeBoard(
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Param('boardId') boardId: number,
  ) {
    await this.boardLikeService.likeBoard(userId, boardId);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async unlikeBoard(
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Param('boardId') boardId: number,
  ) {
    await this.boardLikeService.unlikeBoard(userId, boardId);
  }
}
