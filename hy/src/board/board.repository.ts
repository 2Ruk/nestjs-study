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

  async findAll() {
    return await this.createQueryBuilder('board')
      .where('board.user_id IS NOT NULL AND board.deleted = false')
      .innerJoinAndSelect('board.user', 'user')
      .select([
        'board.id',
        'board.title',
        'board.description',
        'board.status',
        'board.created_at',
        'board.updated_at',
        'user.id',
        'user.username',
        'user.created_at',
        'user.updated_at',
      ])
      .getMany();
  }
}
