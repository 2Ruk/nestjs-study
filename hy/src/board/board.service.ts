import {
  BadRequestException,
  ForbiddenException,
  Injectable,
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

  async findAll() {
    try {
      return await this.boardRepository.findAll();
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

  async update(userId: number, id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.getBoardByUserWithValidate(id, userId);
    board.title = updateBoardDto.title;
    board.description = updateBoardDto.description;
    await this.boardRepository.save(board);
  }

  async delete(userId: number, id: number) {
    const board = await this.getBoardByUserWithValidate(id, userId);
    board.deleted = true;
    await this.boardRepository.save(board);
  }

  private async getBoardByUserWithValidate(id: number, userId: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });
    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }
    if (board.user.id !== userId) {
      throw new ForbiddenException('본인의 게시글만 삭제할 수 있습니다.');
    }
    return board;
  }
}
