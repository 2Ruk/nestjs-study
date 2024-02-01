import { Controller, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { BoardLikeService } from './board-like.service';
import { JwtGuard } from '@api/auth/jwt.guard';
import { CurrentUser } from '@api/library/decorator/current-user';
import { UserJwtPayload } from '@api/auth/auth.service';

@Controller('/board/:boardId/like')
export class BoardLikeController {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @UseGuards(JwtGuard)
  @Post()
  async likeBoard(
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Param('boardId') boardId: number,
  ) {
    return await this.boardLikeService.likeBoard(userId, boardId);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async unlikeBoard(
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Param('boardId') boardId: number,
  ) {
    return this.boardLikeService.unlikeBoard(userId, boardId);
  }
}
