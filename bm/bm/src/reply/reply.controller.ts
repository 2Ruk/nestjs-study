import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { JwtGuard } from '@api/auth/jwt.guard';
import { UserJwtPayload } from '@api/auth/auth.service';
import { CurrentUser } from '@api/library/decorator/current-user';

@Controller('/board/:boardId/reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Param('boardId') boardId: number,
    @Body() createReplyDto: CreateReplyDto,
  ) {
    return this.replyService.create(userId, boardId, createReplyDto);
  }

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.update(+id, updateReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replyService.remove(+id);
  }
}
