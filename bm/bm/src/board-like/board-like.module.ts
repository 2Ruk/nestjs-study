import { Module } from '@nestjs/common';
import { BoardLikeService } from './board-like.service';
import { BoardLikeController } from './board-like.controller';

@Module({
  controllers: [BoardLikeController],
  providers: [BoardLikeService],
})
export class BoardLikeModule {}
