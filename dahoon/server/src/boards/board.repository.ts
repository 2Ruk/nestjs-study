import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create.board.dto";
import {BoardStatus} from "./board.model";


@Injectable()
export class BoardRepository extends Repository<Board>{
  constructor() {
    super(undefined, undefined, undefined);
  }

  async createBoard(createBoard: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoard;
    return this.create({
      title,
      description,
      status: BoardStatus.PULBIC
    })
  }


}