import { Module } from '@nestjs/common';
import { ReplyService } from '@api/reply/reply.service';
import { ReplyRepository } from '@api/reply/reply.repository';
import { ReplyController } from '@api/reply/reply.controller';
import { ReplyLikeRepository } from '@api/reply/reply-like.repository';

@Module({
  controllers: [ReplyController],
  providers: [ReplyService, ReplyRepository, ReplyLikeRepository],
  exports: [ReplyService],
})
export class ReplyModule {}
