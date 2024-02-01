import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardLikeDto } from './create-board-like.dto';

export class UpdateBoardLikeDto extends PartialType(CreateBoardLikeDto) {}
