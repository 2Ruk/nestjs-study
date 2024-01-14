import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from '@api/board/entities/board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async findAllMyBoard(userId: number) {
    return await this.createQueryBuilder('board')
      .where('board.user_id = :id', {
        userId,
      })
      .getMany();
  }

  async findAllBoardAndUserAndLikes() {
    return await this.createQueryBuilder('board')
      .where('board.user_id IS NOT NULL')
      .innerJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect('board.likes', 'likes')
      .orderBy('board.created_at', 'DESC')
      .getMany();
  }
}
