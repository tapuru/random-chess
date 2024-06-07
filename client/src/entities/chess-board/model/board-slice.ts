import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Square } from "react-chessboard/dist/chessboard/types";
import { OptionSquares } from "../types/option-squares";

interface BoardState {
  fromSquare: Square | null;
  toSquare: Square | null;
  optionSquares: OptionSquares;
  showPromotionDialog: boolean;
}

const initialState: BoardState = {
  fromSquare: null,
  toSquare: null,
  optionSquares: {},
  showPromotionDialog: false,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setFromSquare: (state, action: PayloadAction<Square | null>) => {
      state.fromSquare = action.payload;
    },
    setToSquare: (state, action: PayloadAction<Square | null>) => {
      state.toSquare = action.payload;
    },
    setOptionSquares: (state, action: PayloadAction<OptionSquares>) => {
      state.optionSquares = action.payload;
    },
    setShowPromotionDialog: (state, action: PayloadAction<boolean>) => {
      state.showPromotionDialog = action.payload;
    },
  },
});

export const boardReducer = boardSlice.reducer;

export const boardActions = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;
