import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "../types/game";
import { GameSettings } from "../types/game-settings";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";
import { Turn } from "@/shared/types/turn";

interface GameState {
  game: Game | null;
  settings: GameSettings;
}

const initialState: GameState = {
  game: {
    currentTurnColor: ChessColors.WHITE,
    turns: [],
  },
  settings: {
    initialFen: "",
    mode: GameModes.CLASSICAL,
    type: GameTypes.LOCAL,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrnetTurnColor(state, action: PayloadAction<ChessColors>) {
      if (state.game) {
        state.game.currentTurnColor = action.payload;
      }
    },
    toggleCurrentTurnColor(state) {
      if (state.game) {
        state.game.currentTurnColor === ChessColors.BLACK
          ? (state.game.currentTurnColor = ChessColors.WHITE)
          : (state.game.currentTurnColor = ChessColors.BLACK);
      }
    },
    makeTurn(state, action: PayloadAction<Turn>) {
      if (state.game) {
        state.game.turns.push(action.payload);
      }
    },
    setGameSettings(state, action: PayloadAction<GameSettings>) {
      state.settings = action.payload;
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const gameActions = gameSlice.actions;

export const selectGame = (state: RootState) => state.game.game;
export const selectGameSettings = (state: RootState) => state.game.settings;
