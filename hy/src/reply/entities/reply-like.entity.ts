import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '@api/user/entities/user.entity';
import { Board } from '@api/board/entities/board.entity';
import { ReplyEntity } from '@api/reply/entities/reply.entity';

@Entity('reply_like')
@Unique('UQ_REPLY_LIKE_1', ['user', 'reply'])
export class ReplyLikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ReplyEntity)
  @JoinColumn({ name: 'reply_id' })
  reply: ReplyEntity;

  @CreateDateColumn()
  created_at: Date;
}
