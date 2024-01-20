import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reply } from '@api/board/entities/reply.entity';
import { User } from '@api/user/entities/user.entity';

@Entity()
export class ReplyLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reply)
  @JoinColumn({ name: 'reply_id' })
  reply: Reply;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
