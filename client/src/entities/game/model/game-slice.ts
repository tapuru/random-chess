import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "../types/game";
import { GameSettings } from "../types/game-settings";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";
import { Move } from "chess.js";
import { GameStatus } from "@/shared/types/game-status";
import { GameResult } from "../types/game-result";

interface GameState {
  game: Game | null;
  settings: GameSettings;
  result: GameResult | null;
  gameHasRestarted: boolean;
}

const initialState: GameState = {
  game: {
    currentTurn: ChessColors.WHITE,
    moves: [],
    status: GameStatus.PENDING,
    initialFen: "",
  },
  settings: {
    mode: GameModes.CLASSICAL,
    type: GameTypes.LOCAL,
    time: null,
    additionTime: null,
    timeControl: null,
  },
  result: null,
  //this flag is used for updating the board with non-serializable chess state
  gameHasRestarted: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrnetTurnColor(state, action: PayloadAction<ChessColors>) {
      if (state.game) {
        state.game.currentTurn = action.payload;
      }
    },
    toggleCurrentTurn(state) {
      if (state.game) {
        state.game.currentTurn === ChessColors.BLACK
          ? (state.game.currentTurn = ChessColors.WHITE)
          : (state.game.currentTurn = ChessColors.BLACK);
      }
    },
    addMove(state, action: PayloadAction<Move>) {
      if (state.game) {
        state.game.moves.push(action.payload);
        state.game.currentPosition = action.payload.after;
      }
    },
    setGameSettings(state, action: PayloadAction<GameSettings>) {
      state.settings = action.payload;
    },
    setResult(state, action: PayloadAction<GameResult | null>) {
      state.result = action.payload;
    },
    setGame(state, action: PayloadAction<Game | null>) {
      if (action.payload !== null) state.gameHasRestarted = true;
      state.game = action.payload;
    },
    setGameStatus(state, action: PayloadAction<GameStatus>) {
      if (state.game) state.game.status = action.payload;
    },
    resetGame(state) {
      if (state.game) {
        state.game.currentTurn = ChessColors.WHITE;
        state.game.moves = [];
        state.game.status = GameStatus.PENDING;
        //has to be manually set to false in the startGame function
        state.gameHasRestarted = true;
      }
    },
    setGameHasRestarted: (state, action: PayloadAction<boolean>) => {
      state.gameHasRestarted = action.payload;
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const gameActions = gameSlice.actions;

export const selectGame = (state: RootState) => state.game.game;
export const selectGameSettings = (state: RootState) => state.game.settings;
export const selectGameResult = (state: RootState) => state.game.result;
export const selectGameHasRestarted = (state: RootState) =>
  state.game.gameHasRestarted;
