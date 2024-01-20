import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '@api/board/entities/board.entity';
import { User } from '@api/user/entities/user.entity';

@Entity()
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Board, { lazy: true })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
