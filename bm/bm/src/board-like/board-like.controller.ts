import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BoardLikeService } from "./board-like.service";
import { CreateBoardLikeDto } from "./dto/create-board-like.dto";

@Controller("board-like")
export class BoardLikeController {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @Post()
  create(@Body() createBoardLikeDto: CreateBoardLikeDto) {
    return this.boardLikeService.create(createBoardLikeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.boardLikeService.remove(+id);
  }
}
