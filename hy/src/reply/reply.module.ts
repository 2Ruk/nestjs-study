import { Module } from '@nestjs/common';
import { ReplyService } from '@api/reply/reply.service';
import { ReplyRepository } from '@api/reply/reply.repository';
import { ReplyController } from '@api/reply/reply.controller';

@Module({
  controllers: [ReplyController],
  providers: [ReplyService, ReplyRepository],
  exports: [ReplyService],
})
export class ReplyModule {}
