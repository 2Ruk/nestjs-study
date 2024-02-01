import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from '@api/board/entities/board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async findAllMyBoardAndCount(userId: number, page: number, unit: number) {
    const skip = (page - 1) * unit;
    return await this.createQueryBuilder('board')
      .where('board.user_id = :userId', {
        userId,
      })
      .skip(skip)
      .take(unit)
      .getManyAndCount();
  }

  async findAllBoardAndUserAndLikesAndCount(page: number, unit: number) {
    const skip = (page - 1) * unit;
    return await this.createQueryBuilder('board')
      .where('board.user_id IS NOT NULL')
      .innerJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect('board.likes', 'likes')
      .orderBy('board.created_at', 'DESC')
      .skip(skip)
      .take(unit)
      .getManyAndCount();
  }
}
