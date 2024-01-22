import { Module } from '@nestjs/common';
import { BoardLikeController } from '@api/board-like/board-like.controller';
import { BoardLikeService } from '@api/board-like/board-like.service';
import { BoardLikeRepository } from '@api/board-like/board-like.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardLikeRepository])],
  providers: [BoardLikeService, BoardLikeRepository],
  controllers: [BoardLikeController],
})
export class BoardLikeModule {}
