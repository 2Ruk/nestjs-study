import { Board } from '@api/board/entities/board.entity';
import { User } from '@api/user/entities/user.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BoardLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

/**
 * @JoinColumn
 * FK(Foreign key-외래키)와 관련있음
 * 주로 1:N(OneToMany), N:1(ManyToOne) 관계에서 사용됨
 *
 * board 컬럼은 board_id 컬럼을 사용하여 BoardLike와 Board entity들 연결.
 * user 컬럼은 user_id 컬럼을 사용하여 BoardLike와 user entity들 연결.
 */
