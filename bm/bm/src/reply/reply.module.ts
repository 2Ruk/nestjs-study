import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { ReplyRepository } from './reply.repository';

@Module({
  controllers: [ReplyController],
  providers: [ReplyService, ReplyRepository],
})
export class ReplyModule {}
