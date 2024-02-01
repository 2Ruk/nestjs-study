import { DataSource, Repository } from 'typeorm';
import { Reply } from '@api/board/entities/reply.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplyRepository extends Repository<Reply> {
  constructor(private readonly dataSource: DataSource) {
    super(Reply, dataSource.createEntityManager());
  }
}
