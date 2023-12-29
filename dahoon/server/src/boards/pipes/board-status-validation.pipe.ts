import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PULBIC];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} isn't in the status`);
    return value;
  }

  private isStatusValid(status: any) {
    return this.StatusOptions.indexOf(status) > -1;
  }
}
