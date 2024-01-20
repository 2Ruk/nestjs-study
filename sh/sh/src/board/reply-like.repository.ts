import { DataSource, Repository } from 'typeorm';
import { ReplyLike } from '@api/board/entities/reply-like.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReplyLikeRepository extends Repository<ReplyLike> {
  constructor(private readonly dataSource: DataSource) {
    super(ReplyLike, dataSource.createEntityManager());
  }
}
