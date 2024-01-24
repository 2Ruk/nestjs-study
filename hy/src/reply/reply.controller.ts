import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ReplyService } from '@api/reply/reply.service';
import { JwtGuard } from '@api/auth/jwt.guard';

@Controller('/board/:boardId/reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create() {}

  @Get()
  async findAll() {}

  @UseGuards(JwtGuard)
  @Post(':id')
  async update() {}

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteOneBoard() {}
}
