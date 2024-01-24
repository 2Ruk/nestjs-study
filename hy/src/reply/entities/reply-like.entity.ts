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

@Entity()
@Unique('UQ_REPLY_LIKE', ['user', 'board'])
export class ReplyLikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Board)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @CreateDateColumn()
  created_at: Date;
}
