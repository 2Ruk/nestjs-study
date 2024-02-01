import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Board } from '@api/board/entities/board.entity';
import { User } from '@api/user/entities/user.entity';
import { BoardLike } from '@api/board-like/entities/board-like.entity';

export const DbConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get('DB_USER'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  entities: [Board, User, BoardLike],
  synchronize: true,
});
