import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ReplyLikeEntity } from '@api/reply/entities/reply-like.entity';

@Injectable()
export class ReplyLikeRepository extends Repository<ReplyLikeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReplyLikeEntity, dataSource.createEntityManager());
  }
}
