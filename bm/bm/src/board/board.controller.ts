import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtGuard } from '@api/auth/jwt.guard';
import { CurrentUser } from '@api/library/decorator/current-user';
import { UserJwtPayload } from '@api/auth/auth.service';

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
  @Patch(':boardId')
  update(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() UpdateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(id, boardId, UpdateBoardDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':boardId')
  delete(
    @CurrentUser() { id }: UserJwtPayload,
    @Param('boardId', ParseIntPipe) boardId: number,
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
