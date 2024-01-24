import { Injectable } from '@nestjs/common';
import { ReplyRepository } from '@api/reply/reply.repository';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}
}
