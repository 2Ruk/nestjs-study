import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { BoardStatus } from '@api/user/enum/board.status.enum';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsEnum(BoardStatus)
  @IsOptional()
  status?: BoardStatus;
}
