import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardStatus } from '@api/user/enum/board.status.enum';
import { User } from '@api/user/entities/user.entity';
import { BoardLike } from '@api/board/entities/board-like.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => BoardLike, (like) => like.board)
  likes: BoardLike[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
