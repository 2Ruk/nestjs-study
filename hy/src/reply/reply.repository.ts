import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ReplyEntity } from '@api/reply/entities/reply.entity';
import { ReplyLikeRepository } from '@api/reply/reply-like.repository';
import { ReplyLikeEntity } from '@api/reply/entities/reply-like.entity';

@Injectable()
export class ReplyRepository extends Repository<ReplyEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly replyLikeRepository: ReplyLikeRepository,
  ) {
    super(ReplyEntity, dataSource.createEntityManager());
  }

  async findAll(boardId: number, userId: number): Promise<any[]> {
    const query = this.createQueryBuilder('reply')
      .where('reply.board = :boardId AND reply.deleted IS NULL', { boardId })
      .leftJoinAndSelect('reply.user', 'user')
      .leftJoinAndSelect('reply.board', 'board')
      .orderBy('reply.created_at', 'DESC');

    if (userId) {
      // 좋아요 개수 및 내가 누른지 여부를 가져오기 위한 서브쿼리를 사용합니다.
      const subQuery = this.replyLikeRepository
        .createQueryBuilder('reply_like')
        .select('COUNT(reply_like.reply)', 'likedCount')
        .where('reply_like.reply = reply.id')
        .getQuery();

      // 좋아요 개수와 내가 누른지 여부를 가져옵니다.
      query
        .addSelect(`(${subQuery})`, 'likedCount') // 좋아요 개수
        .addSelect(
          `CASE WHEN (${subQuery}) > 0 THEN true ELSE false END`,
          'isLiked',
        ); // 내가 누른지 여부

      // reply_like 테이블과 조인합니다.
      query.leftJoin(
        ReplyLikeEntity,
        'reply_like',
        'reply_like.user = :userId AND reply_like.reply = reply.id',
        {
          userId,
        },
      );
    }

    const replies = await query.getRawMany();
    return replies;
  }
}
