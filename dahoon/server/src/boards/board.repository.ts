import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create.board.dto';
import { BoardStatus } from './board.model';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    const boardRepository = dataSource.getRepository(Board);
    super(
      boardRepository.target,
      boardRepository.manager,
      boardRepository.queryRunner,
    );
  }

  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoard;
    const createBoardEntity = await this.create({
      title,
      description,
      status: BoardStatus.PULBIC,
    });
    await this.save(createBoardEntity);
    return createBoardEntity;
  }
}
