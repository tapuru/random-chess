import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../types/player";
import { ChessColors } from "@/shared/types/chess-colors";

interface PlayersState {
  player: Player | null;
  enemy: Player | null;
}

const initialState: PlayersState = {
  player: null,
  enemy: null,
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
    },
    setEnemy: (state, action: PayloadAction<Player>) => {
      state.enemy = action.payload;
    },
    changePlayerTime: (
      state,
      action: PayloadAction<{ time: number; color: ChessColors }>
    ) => {
      const player = [state.enemy, state.player].find(
        (p) => p?.color === action.payload.color
      );
      if (!player) return;
      if (player.timeLeft !== null) {
        player.timeLeft === 0
          ? (player.timeLeft = 0)
          : (player.timeLeft += action.payload.time);
      }
    },
  },
});

export const playersReducer = playersSlice.reducer;
export const playersActions = playersSlice.actions;

export const selectPlayer = (state: RootState) => state.players.player;
export const selectEnemy = (state: RootState) => state.players.enemy;
