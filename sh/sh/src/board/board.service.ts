import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from '@api/board/board.repository';
import { Board } from '@api/board/entities/board.entity';
import { BoardStatus } from '@api/user/enum/board.status.enum';
import { UpdateBoardDto } from '@api/board/dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(userId: number, createBoardDto: CreateBoardDto) {
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
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }

    const user = await board.user;
    if (user.id !== userId) {
      throw new UnauthorizedException(
        '자신이 작성한 게시글만 수정할 수 있습니다.',
      );
    }

    try {
      await this.boardRepository.update(boardId, updateBoardDto);
      return await this.boardRepository.findOneBy({ id: boardId });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(userId: number, boardId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }

    const user = await board.user;
    if (user.id !== userId) {
      throw new UnauthorizedException(
        '자신이 작성한 게시글만 삭제할 수 있습니다.',
      );
    }

    try {
      await this.boardRepository.delete(boardId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll() {
    try {
      return await this.boardRepository
        .createQueryBuilder('board')
        .where('board.user_id IS NOT NULL')
        .innerJoinAndSelect('board.user', 'user')
        .orderBy('board.created_at', 'DESC')
        .getMany();
    } catch (e) {
      console.log(e);
      throw new BadRequestException('게시글을 불러오는데 실패하였습니다.');
    }
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }

    return board;
  }

  async findAllMyBoard(userId: number) {
    return await this.boardRepository.findAllMyBoard(userId);
  }
}
