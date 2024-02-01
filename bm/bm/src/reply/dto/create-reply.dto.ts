import { IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  contents: string;
}
