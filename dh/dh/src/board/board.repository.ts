import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
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
}
