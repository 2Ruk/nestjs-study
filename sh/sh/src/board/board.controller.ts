import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtGuard } from '@api/auth/jwt.guard';
import { CurrentUser } from '@api/library/decorator/current-user';
import { UserJwtPayload } from '@api/auth/auth.service';
import { UpdateBoardDto } from '@api/board/dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @CurrentUser() { id }: UserJwtPayload,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.create(id, createBoardDto);
  }

  @UseGuards(JwtGuard)
  @Put(':board_id')
  update(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(id, boardId, updateBoardDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':board_id')
  delete(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
  ) {
    return this.boardService.delete(id, boardId);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  findAllMyBoard(@CurrentUser() { id }: UserJwtPayload) {
    return this.boardService.findAllMyBoard(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }
}
