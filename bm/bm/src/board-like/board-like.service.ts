import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardLikeRepository } from './board-like.repository';

@Injectable()
export class BoardLikeService {
  constructor(private readonly boardLikeRepository: BoardLikeRepository) {}

  async likeBoard(userId: number, boardId: number) {
    const liked = await this.boardLikeRepository.findOne({
      where: {
        user: { id: userId },
        board: { id: boardId },
      },
    });

    if (liked) {
      throw new BadRequestException('이미 좋아요를 누른 게시글입니다.');
    }

    return await this.boardLikeRepository.likeBoard(userId, boardId);
  }

  async unlikeBoard(userId: number, boardId: number) {
    return await this.boardLikeRepository.unlikeBoard(userId, boardId);
  }
}
