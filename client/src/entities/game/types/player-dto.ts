//TODO: move that to shared, make it pick of profileDto
export interface PlayerDto {
  id: string;
  username: string;
  isInGame: boolean;
  isOnline: boolean;
  photo?: string;
}
