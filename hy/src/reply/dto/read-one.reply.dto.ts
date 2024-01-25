export class ReadOneReplyDto {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted: Date;
  user: {
    id: number;
    username: string;
    created_at: Date;
    updated_at: Date;
  };
  likedCount: number;
  isLiked: boolean;
}
