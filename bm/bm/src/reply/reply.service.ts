import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ReplyRepository } from './reply.repository';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}

  async create(
    userId: number,
    boardId: number,
    createReplyDto: CreateReplyDto,
  ) {
    return await this.replyRepository.createReply(
      userId,
      boardId,
      createReplyDto,
    );
  }

  async findAll(boardId: number) {
    try {
      return await this.replyRepository
        .createQueryBuilder('reply')
        .where('reply.board_id = :boardId', { boardId })
        .getMany();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        `${boardId}번 게시글의 댓글을 불러오는데 실패하였습니다.`,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
