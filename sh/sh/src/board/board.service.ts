import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from '@api/board/board.repository';
import { Board } from '@api/board/entities/board.entity';
import { BoardStatus } from '@api/user/enum/board.status.enum';
import { UpdateBoardDto } from '@api/board/dto/update-board.dto';
import { BoardLikeRepository } from '@api/board/board-like.repository';
import { ValidateService } from '@api/board/validator/validate.service';
import { ValidateIds } from '@api/board/validator/validate-ids';
import { Pagination } from '@api/pagination';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardLikeRepository: BoardLikeRepository,
    private readonly validateService: ValidateService,
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
    const validateIds: ValidateIds = { boardId: boardId, userId: userId };
    await this.validateService.existValidate(validateIds);
    await this.validateService.isOwner(validateIds);

    try {
      await this.boardRepository.update(boardId, updateBoardDto);
      return await this.boardRepository.findOneBy({ id: boardId });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(userId: number, boardId: number) {
    const validateIds: ValidateIds = { boardId: boardId, userId: userId };
    await this.validateService.existValidate(validateIds);
    await this.validateService.isOwner(validateIds);

    try {
      await this.boardRepository.delete(boardId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(page: number, unit: number) {
    try {
      const [boards, total] =
        await this.boardRepository.findAllBoardAndUserAndLikesAndCount(
          page,
          unit,
        );

      return { boards: boards, pagination: Pagination.of(total, page, unit) };
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

  async findAllMyBoard(userId: number, page: number, unit: number) {
    const [boards, total] = await this.boardRepository.findAllMyBoardAndCount(
      userId,
      page,
      unit,
    );

    return { boards: boards, pagination: Pagination.of(total, page, unit) };
  }

  async like(userId: number, boardId: number) {
    const validateIds: ValidateIds = { boardId: boardId };
    await this.validateService.existValidate(validateIds);

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
    const validateIds: ValidateIds = { boardId: boardId };
    await this.validateService.existValidate(validateIds);

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
