import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameModes } from "../types/game-modes";
import { ChessColors } from "@/shared/types/chess-colors";
import { Turn } from "../types/turn";
import { Player } from "@/entities/player";
import { GameState } from "../types/game-state";
import { GameResult } from "../types/game-result";

interface RoomState {
  gameSettings: {};
  currentGame: GameState | null;
  games: GameResult[];
  gameVariant: "local" | "online" | "engine";
  id: string | "local";
  mode: GameModes;
  initialFen: string | null;
  currentTurn: ChessColors;
  turns: Turn[];
  players: Player[];
}

const initialState: RoomState = {
  gameVariant: "local",
  id: "local",
  mode: GameModes.CLASSICAL,
  initialFen: null,
  currentTurn: ChessColors.WHITE,
  turns: [],
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
};

export const roomSlice = createSlice({
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

export const roomReducer = roomSlice.reducer;

export const { toggleCurrentTurn, makeTurn, setCurrnetTurn } =
  roomSlice.actions;

export const selectCurrentTurn = (state: RootState) => state.room;
export const selectCurrentGame = (state: RootState) => state.room;
