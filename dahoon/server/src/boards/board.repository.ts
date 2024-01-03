import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create.board.dto';
import { BoardStatus } from './board.model';
import { User } from 'src/auth/user.entity';

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

  async createBoard(createBoard: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoard;
    const createBoardEntity = await this.create({
      title,
      description,
      status: BoardStatus.PULBIC,
      user,
    });
    await this.save(createBoardEntity);
    return createBoardEntity;
  }

  async getBoardsByUserId(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    return query.getMany();
  }
}
