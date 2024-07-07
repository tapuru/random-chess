import { apiSlice } from "@/shared/api/api-slice";
import { CreateOnlineGameFormData } from "../lib/schemas/create-online-game-schema";
import { getSocket } from "@/shared/api/ws-base-api";
import { GameMessages } from "../types/game-messages";
import { GameDto } from "../types/game-dto";
import { MoveDto } from "../types/move-dto";
import { Move } from "chess.js";
import { GameEndReason } from "../types/game-result";
import { ChessColors } from "@/shared/types/chess-colors";

export const gameApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOnlineGame: builder.mutation<GameDto, CreateOnlineGameFormData>({
      queryFn: (payload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(GameMessages.CREATE_GAME, payload, (game: GameDto) => {
            resolve({ data: game });
          });
        });
      },
    }),
    getGame: builder.query<GameDto, string>({
      query: (id) => `/game/${id}`,
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          socket.on(GameMessages.GAME_JOINED, (game: GameDto) => {
            console.log(game);
            updateCachedData(() => game);
          });

          socket.on(GameMessages.MOVE, (game: GameDto) => {
            updateCachedData(() => game);
          });

          socket.on(GameMessages.GAME_FINISHED, (game: GameDto) => {
            updateCachedData(() => game);
          });

          await cacheEntryRemoved;
          socket.off(GameMessages.GAME_JOINED);
          socket.off(GameMessages.MOVE);
          socket.off(GameMessages.GAME_FINISHED);
        } catch {}
      },

      providesTags: ["Game"],
    }),
    /* getGameResult: builder.query<
      { reason: GameEndReason; winner?: ChessColors },
      void
    >({
      query: () => "/",
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on(GameMessages.GAME_FINISHED, (result) => {
            updateCachedData(() => result);
          });

          await cacheEntryRemoved;
          socket.off(GameMessages.GAME_FINISHED);
        } catch (error) {}
      },
    }), */
    joinGame: builder.mutation<GameDto, { gameId: string; userId: string }>({
      queryFn: (payload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(GameMessages.JOIN_GAME, payload, (game: GameDto) => {
            resolve({ data: game });
          });
        });
      },
      invalidatesTags: ["Game"],
    }),
    makeMove: builder.mutation<void, MoveDto>({
      queryFn: (payload) => {
        const socket = getSocket();

        return new Promise(() => {
          socket.emit(GameMessages.MOVE, payload);
        });
      },
    }),
    resign: builder.mutation<GameDto, { gameId: string; userId: string }>({
      queryFn: (payload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(GameMessages.RESIGN, payload);
        });
      },
    }),
  }),
});
