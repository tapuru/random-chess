import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChessColors } from "@/shared/types/chess-colors";
import { Player } from "@/entities/player";
import { GameResult } from "../types/game-result";
import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";

interface RoomState {
  id: string | "local";
  games: GameResult[];
  players: Player[];
}

const initialState: RoomState = {
  id: "local",
  players: [
    {
      color: ChessColors.BLACK,
      isRoomOwner: true,
      isWinner: false,
      loses: 0,
      wins: 0,
      ownerId: 1,
    },
    {
      color: ChessColors.WHITE,
      isRoomOwner: false,
      isWinner: false,
      loses: 0,
      wins: 0,
      ownerId: 1,
    },
  ],
  games: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
});

export const roomReducer = roomSlice.reducer;

export const selectRoomPlayers = (state: RootState) => state.room.players;
export const selectRoomGames = (state: RootState) => state.room.games;
export const selectRoomId = (state: RootState) => state.room.id;
