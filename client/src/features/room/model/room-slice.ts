import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChessColors } from "@/shared/types/chess-colors";
import { Player } from "@/entities/player";
import { GameResult } from "../types/game-result";

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
      isRoomOwner: false,
      isWinner: false,
      loses: 0,
      wins: 0,
      ownerId: 1,
      timeLeft: 300,
    },
    {
      color: ChessColors.WHITE,
      isRoomOwner: true,
      isWinner: false,
      loses: 0,
      wins: 0,
      ownerId: 2,
      timeLeft: 300,
    },
  ],
  games: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    decrementPlayerTime(state, action: PayloadAction<number>) {
      state.players.forEach((p) => {
        if (p.ownerId === action.payload && p.timeLeft !== null) {
          p.timeLeft > 0 ? p.timeLeft-- : (p.timeLeft = 0);
        }
      });
    },
  },
});

export const roomReducer = roomSlice.reducer;

export const roomActions = roomSlice.actions;

export const selectRoomPlayers = (state: RootState) => state.room.players;
export const selectRoomGames = (state: RootState) => state.room.games;
export const selectRoomId = (state: RootState) => state.room.id;
