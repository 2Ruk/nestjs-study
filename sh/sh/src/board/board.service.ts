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
import { BoardLikeRepository } from '@api/board/board-like.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardLikeRepository: BoardLikeRepository,
  ) {}

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
      return await this.boardRepository.findAllBoardAndUserAndLikes();
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

  async like(userId: number, boardId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }

    const like = await this.boardLikeRepository.findByUserIdAndBoardId(
      userId,
      boardId,
    );
    if (like) {
      throw new BadRequestException('이미 좋아요를 누른 게시글 입니다.');
    }

    const boardLike = this.boardLikeRepository.create({
      board: {
        id: boardId,
      },
      user: {
        id: userId,
      },
    });

    await this.boardLikeRepository.save(boardLike);
  }

  async cancelLike(userId: number, boardId: number) {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }

    const like = await this.boardLikeRepository.findByUserIdAndBoardId(
      userId,
      boardId,
    );
    if (!like) {
      throw new BadRequestException('좋아요를 취소할 수 없는 게시글 입니다.');
    }

    await this.boardLikeRepository.delete(like.id);
  }
}
