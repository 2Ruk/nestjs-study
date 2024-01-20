import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  findAll(@Query('page') page: number, @Query('unit') unit: number) {
    return this.boardService.findAll(page, unit);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  findAllMyBoard(
    @CurrentUser() { id }: UserJwtPayload,
    @Query('page') page: number,
    @Query('unit') unit: number,
  ) {
    return this.boardService.findAllMyBoard(id, page, unit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Post(':board_id/like')
  like(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
  ) {
    return this.boardService.like(id, boardId);
  }

  @UseGuards(JwtGuard)
  @Delete(':board_id/like')
  cancelLike(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('board_id') boardId: number,
  ) {
    return this.boardService.cancelLike(id, boardId);
  }
}
