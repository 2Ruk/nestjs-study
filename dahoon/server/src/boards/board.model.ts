export enum BoardStatus {
  PULBIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
