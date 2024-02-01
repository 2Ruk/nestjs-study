import { Module } from '@nestjs/common';
import { BoardLikeService } from './board-like.service';
import { BoardLikeController } from './board-like.controller';
import { BoardLikeRepository } from './board-like.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardLikeRepository])],
  controllers: [BoardLikeController],
  providers: [BoardLikeService, BoardLikeRepository],
})
export class BoardLikeModule {}
