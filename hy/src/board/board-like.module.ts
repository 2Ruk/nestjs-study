import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardLikeRepository } from '@api/board/board-like.repository';
import { BoardLikeService } from '@api/board/board-like.service';
import { BoardLikeController } from '@api/board/board-like.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardLikeRepository])],
  providers: [BoardLikeService, BoardLikeRepository],
  controllers: [BoardLikeController],
})
export class BoardLikeModule {}
