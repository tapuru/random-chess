export interface Room {
  id: string;
  isPrivate: boolean;
  owner: string;
  players: string[];
  createdAt: Date;
  updatedAt: Date;
}
