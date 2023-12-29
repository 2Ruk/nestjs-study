import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Post, Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create.board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import {Board} from "./board.entity";

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  async getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  async getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Put('/:id')
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  async deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoardById(id);
  }
}
