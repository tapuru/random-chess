import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameModes } from "../types/game-modes";
import { ChessColors } from "@/shared/types/chess-colors";
import { Turn } from "../types/turn";
import { Player } from "@/entities/player";

interface GameState {
  gameVariant: "local" | "online" | "engine";
  id: string | "local";
  mode: GameModes;
  initialFen: string | null;
  playerOne: Player;
  playerTwo: Player;
  currentTurn: ChessColors;
  turns: Turn[];
  //players: Player[]
}

const initialState: GameState = {
  gameVariant: "local",
  id: "local",
  mode: GameModes.CLASSICAL,
  initialFen: null,
  playerOne: {
    ownerId: 1,
    color: ChessColors.WHITE,
    isWinner: false,
    loses: 0,
    wins: 0,
    isRoomOwner: true,
  },
  playerTwo: {
    isRoomOwner: false,
    ownerId: 1,
    color: ChessColors.WHITE,
    isWinner: false,
    loses: 0,
    wins: 0,
  },
  currentTurn: ChessColors.WHITE,
  turns: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCurrnetTurn(state, action: PayloadAction<ChessColors>) {
      state.currentTurn = action.payload;
    },
    toggleCurrentTurn(state) {
      state.currentTurn === ChessColors.BLACK
        ? (state.currentTurn = ChessColors.WHITE)
        : (state.currentTurn = ChessColors.BLACK);
    },
    makeTurn(state, action: PayloadAction<Turn>) {
      state.turns.push(action.payload);
    },
  },
});

export const gameReducer = gameSlice.reducer;

export const { toggleCurrentTurn, makeTurn, setCurrnetTurn } =
  gameSlice.actions;

export const selectCurrentTurn = (state: RootState) => state.game.currentTurn;
export const selectCurrentGame = (state: RootState) => state.game;
