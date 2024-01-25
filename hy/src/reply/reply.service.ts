import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReplyRepository } from '@api/reply/reply.repository';
import { ReplyEntity } from '@api/reply/entities/reply.entity';
import { ReadOneReplyDto } from '@api/reply/dto/read-one.reply.dto';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}

  async create(userId: number, boardId: number, content: string) {
    const reply = ReplyEntity.create({
      user: {
        id: userId,
      },
      board: {
        id: +boardId,
      },
      content,
    });

    return await this.replyRepository.save(reply);
  }

  async findAll(boardId: number, userId: number): Promise<ReadOneReplyDto[]> {
    const repliesRaw = await this.replyRepository.findAll(boardId, userId);
    const replies = repliesRaw.map((reply) => {
      return {
        id: reply.reply_id,
        content: reply.reply_content,
        created_at: reply.reply_created_at,
        updated_at: reply.reply_updated_at,
        deleted: reply.reply_deleted,
        user: {
          id: reply.reply_user_id,
          username: reply.user_username,
          created_at: reply.user_created_at,
          updated_at: reply.user_updated_at,
        },
        likedCount: reply.likedCount,
        isLiked: reply.isLiked,
      };
    });
    return replies;
  }

  async update(userId: number, boardId: number, id: number, content: string) {
    const reply = await this.findOneById(id);
    this.validateReply(reply, userId);
    if (reply.user.id !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    reply.content = content;
    return await this.replyRepository.save(reply);
  }

  async deleteOneBoard(userId: number, boardId: number, id: number) {
    const reply = await this.findOneById(id);
    this.validateReply(reply, userId);
    reply.deleted = new Date();

    await this.replyRepository.save(reply);
  }

  private async findOneById(id: number) {
    const reply = await this.replyRepository.findOne({
      where: {
        id,
        deleted: null,
      },
      relations: ['user', 'board'],
    });

    if (!reply) {
      throw new NotFoundException('존재하지 않는 댓글입니다.');
    }

    return reply;
  }
  private validateReply(reply: ReplyEntity, userId: number) {
    if (reply.user.id !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
  }
}
