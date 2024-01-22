import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardLike } from '@api/board-like/entities/board-like.entity';

@Injectable()
export class BoardLikeRepository extends Repository<BoardLike> {
  constructor(private readonly dataSource: DataSource) {
    super(BoardLike, dataSource.createEntityManager());
  }

  async likeBoard(userId: number, boardId: number) {
    const boardLike = BoardLike.create({
      user: {
        id: userId,
      },
      board: {
        id: boardId,
      },
    });
    return await this.save(boardLike);
  }

  async unlikeBoard(userId: number, boardId: number) {
    return await this.delete({
      user: {
        id: userId,
      },
      board: {
        id: boardId,
      },
    });
  }
}
