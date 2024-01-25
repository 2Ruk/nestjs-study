import { Module } from '@nestjs/common';
import { ReplyLikeController } from '@api/reply/reply-like.controller';
import { ReplyLikeService } from '@api/reply/reply-like.service';
import { ReplyLikeRepository } from '@api/reply/reply-like.repository';

@Module({
  controllers: [ReplyLikeController],
  providers: [ReplyLikeService, ReplyLikeRepository],
  exports: [ReplyLikeService],
})
export class ReplyLikeModule {}
