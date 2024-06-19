import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuth = true;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
    },
  },
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuth = (state: AuthState) => state.isAuth;
export const selectAccessToken = (state: AuthState) => state.accessToken;
