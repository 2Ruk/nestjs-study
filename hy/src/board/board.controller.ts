import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
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

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(userId, id, updateBoardDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteOneBoard(
    @CurrentUser() { id: userId }: UserJwtPayload,
    @Param('id') id: number,
  ) {
    return this.boardService.delete(userId, id);
  }
}
