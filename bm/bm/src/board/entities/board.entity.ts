import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardStatus } from '@api/user/enum/board.status.enum';
import { User } from '@api/user/entities/user.entity';

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

  /**
   * Eager relation을 설정하면 엔티티가 로드 될 때마다 자동으로 relation된 엔티티가 함께 로드 됨
   * user는 관계를 형성해준 컬럼이기 때문에 eager 옵션 넣어주지 않으면 repository 에서 해당 게시글 entity 찾을 때 user 제외하고 나머지 entity 불러옴
   */
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
