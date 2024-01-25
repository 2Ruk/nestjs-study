import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReplyService } from '@api/reply/reply.service';
import { JwtGuard } from '@api/auth/jwt.guard';
import { CurrentUser } from '@api/library/decorator/current-user';
import { UserJwtPayload } from '@api/auth/auth.service';
import { CreateReplyDto } from '@api/reply/dto/create.reply.dto';
import { UpdateReplyDto } from '@api/reply/dto/update.reply.dto';

@Controller('/board/:boardId/reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Param('boardId') boardId: number,
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Body() { content }: CreateReplyDto,
  ) {
    return await this.replyService.create(userId, boardId, content);
  }

  @Get()
  async findAll(
    @Param('boardId') boardId: number,
    @CurrentUser() { id: userId }: UserJwtPayload,
  ) {
    return await this.replyService.findAll(boardId, userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('boardId') boardId: number,
    @Param('id') id: number,
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Body() { content }: UpdateReplyDto,
  ) {
    return await this.replyService.update(userId, boardId, id, content);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteOneBoard(
    @Param('boardId') boardId: number,
    @Param('id') id: number,
    @CurrentUser() { id: userId }: UserJwtPayload,
  ) {
    await this.replyService.deleteOneBoard(userId, boardId, id);
  }
}
