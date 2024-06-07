import { Player } from "./player";

export interface OnlinePlayer extends Player {
  ownerId: number;
  //rating: number;
  isRoomOwner: boolean;
  type: "online";
}
