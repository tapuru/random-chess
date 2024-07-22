import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnlineGameState {
  enemyPlayerTimeLeft?: number;
  friendlyPlayerTimeLeft?: number;
}

const initialState: OnlineGameState = {};

export const onlineGameSlice = createSlice({
  name: "onlineGame",
  initialState,
  reducers: {
    setEnemyPlayerTime: (state, action: PayloadAction<number | undefined>) => {
      state.enemyPlayerTimeLeft = action.payload;
    },
    setFrendlyPlayerTime: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.friendlyPlayerTimeLeft = action.payload;
    },
    decrementFrendlyPlayerTime: (state) => {
      if (state.friendlyPlayerTimeLeft) state.friendlyPlayerTimeLeft -= 1;
    },
    decrementEnemyPlayerTime: (state) => {
      if (state.enemyPlayerTimeLeft) state.enemyPlayerTimeLeft -= 1;
    },
  },
});

const selectFrendlyPlayerTimeLeft = (state: RootState) =>
  state.onilneGame.friendlyPlayerTimeLeft;
const selectEnemyPlayerTimeLeft = (state: RootState) =>
  state.onilneGame.enemyPlayerTimeLeft;

export const onlineGameModel = {
  ...onlineGameSlice.actions,
  selectFrendlyPlayerTimeLeft,
  selectEnemyPlayerTimeLeft,
};

export const onlineGameReducer = onlineGameSlice.reducer;
