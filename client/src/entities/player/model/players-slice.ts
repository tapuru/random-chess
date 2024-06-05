import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../types/player";
import { ChessColors } from "@/shared/types/chess-colors";

interface PlayersState {
  playerOne: Player | null;
  playerTwo: Player | null;
}

const initialState: PlayersState = {
  playerOne: null,
  playerTwo: null,
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayerOne: (state, action: PayloadAction<Player>) => {
      state.playerOne = action.payload;
    },
    setPlayerTwo: (state, action: PayloadAction<Player>) => {
      state.playerTwo = action.payload;
    },
    setPlayersTime: (state, action: PayloadAction<number>) => {
      if (state.playerOne) state.playerOne.timeLeft = action.payload;
      if (state.playerTwo) state.playerTwo.timeLeft = action.payload;
    },
    changePlayerTime: (
      state,
      action: PayloadAction<{ time: number; color: ChessColors }>
    ) => {
      const player = [state.playerOne, state.playerTwo].find(
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

export const selectPlayerOne = (state: RootState) => state.players.playerOne;
export const selectPlayerTwo = (state: RootState) => state.players.playerTwo;
