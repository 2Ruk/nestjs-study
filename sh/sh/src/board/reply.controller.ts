import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReplyService } from '@api/board/reply.service';
import { CurrentUser } from '@api/library/decorator/current-user';
import { UserJwtPayload } from '@api/auth/auth.service';
import { JwtGuard } from '@api/auth/jwt.guard';
import { CreateReplyDto } from '@api/board/dto/create-reply.dto';
import { UpdateReplyDto } from '@api/board/dto/update-reply.dto';

@Controller('board')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseGuards(JwtGuard)
  @Post(':board_id/reply')
  create(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    return this.replyService.create(id, boardId, createReplyDto);
  }

  @UseGuards(JwtGuard)
  @Put(':board_id/reply/:reply_id')
  update(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
    @Param('reply_id') replyId: number,
    @Body() updateReplyDto: UpdateReplyDto,
  ) {
    return this.replyService.update(id, boardId, replyId, updateReplyDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':board_id/reply/:reply_id')
  delete(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
    @Param('reply_id') replyId: number,
  ) {
    return this.replyService.delete(id, boardId, replyId);
  }

  @Get(':board_id/reply')
  findAllByBoard(
    @Param('board_id') boardId: number,
    @Query('page') page: number,
    @Query('unit') unit: number,
  ) {
    return this.replyService.findAllByBoardId(boardId, page, unit);
  }

  @UseGuards(JwtGuard)
  @Post(':board_id/reply/:reply_id/like')
  like(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
    @Param('reply_id') replyId: number,
  ) {
    return this.replyService.like(id, boardId, replyId);
  }

  @UseGuards(JwtGuard)
  @Delete(':board_id/reply/:reply_id/like')
  cancelLike(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
    @Param('reply_id') replyId: number,
  ) {
    return this.replyService.cancelLike(id, boardId, replyId);
  }
}
