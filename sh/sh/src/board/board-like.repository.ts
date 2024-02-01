import { DataSource, Repository } from 'typeorm';
import { BoardLike } from '@api/board/entities/board-like.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardLikeRepository extends Repository<BoardLike> {
  constructor(private readonly dataSource: DataSource) {
    super(BoardLike, dataSource.createEntityManager());
  }

  async findByUserIdAndBoardId(userId: number, boardId: number) {
    return await this.createQueryBuilder('like')
      .where('like.user_id = :userId and like.board_id = :boardId', {
        userId,
        boardId,
      })
      .getOne();
  }
}
