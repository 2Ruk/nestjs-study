import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from '@api/board/board.repository';
import { Board } from '@api/board/entities/board.entity';
import { BoardStatus } from '@api/user/enum/board.status.enum';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  /** 메모: @InjectRepository(BoardRepository) 이거 안 해줘도 되는지? */
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(userId: number, createBoardDto: CreateBoardDto) {
    /** 메모: boardRepository.create 이 아니라 entity.create 으로 함?? */
    const board = Board.create({
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
      user: {
        id: userId,
      },
    });
    await this.boardRepository.save(board);
  }

  async update(
    userId: number,
    boardId: number,
    updateBoardDto: UpdateBoardDto,
  ) {
    const board = await this.findOne(boardId);

    if (userId !== board.user.id) {
      throw new UnauthorizedException(
        '다른 유저의 게시글은 수정할 수 없습니다.',
      );
    }

    const updateBoard = {
      ...board,
      ...updateBoardDto,
    };

    await this.boardRepository.save(updateBoard);
  }

  async delete(userId: number, boardId: number) {
    const board = await this.findOne(boardId);

    if (userId !== board.user.id) {
      throw new UnauthorizedException(
        '다른 유저의 게시글은 삭제할 수 없습니다.',
      );
    }

    await this.boardRepository.delete(boardId);
  }

  async findAll() {
    try {
      return await this.boardRepository
        .createQueryBuilder('board')
        .where('board.user_id IS NOT NULL')
        .innerJoinAndSelect('board.user', 'user')
        .getMany();
    } catch (e) {
      console.log(e);
      throw new BadRequestException('게시글을 불러오는데 실패하였습니다.');
    }
  }

  async findOne(id: number) {
    const book = await this.boardRepository.findOne({
      where: {
        id,
      },
    });
    if (!book) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }

    return book;
  }
  async findAllMyBoard(userId: number) {
    return await this.boardRepository.findAllMyBoard(userId);
  }
}
