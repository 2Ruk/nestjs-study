import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class ReplyRepository extends Repository<Reply> {
  constructor(private readonly dataSource: DataSource) {
    super(Reply, dataSource.createEntityManager());
  }

  async createReply(
    userId: number,
    boardId: number,
    createReplyDto: CreateReplyDto,
  ) {
    const reply = Reply.create({
      ...createReplyDto,
      user: { id: userId },
      board: { id: boardId },
    });

    return await this.save(reply);
  }
}
