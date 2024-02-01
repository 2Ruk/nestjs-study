import { Injectable } from "@nestjs/common";
import { CreateBoardLikeDto } from "./dto/create-board-like.dto";
import { UpdateBoardLikeDto } from "./dto/update-board-like.dto";

@Injectable()
export class BoardLikeService {
  create(createBoardLikeDto: CreateBoardLikeDto) {
    return "This action adds a new boardLike";
  }

  remove(id: number) {
    return `This action removes a #${id} boardLike`;
  }
}
