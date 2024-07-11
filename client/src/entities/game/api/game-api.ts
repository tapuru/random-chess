import { apiSlice } from "@/shared/api/api-slice";
import { CreateOnlineGameFormData } from "../lib/schemas/create-online-game-schema";
import { getSocket } from "@/shared/api/ws-base-api";
import { GameMessages } from "../types/game-messages";
import { GameDto } from "../types/game-dto";
import { MoveDto } from "../types/move-dto";
import { RematchData } from "../types/rematch-data";
import { ManipulateGameDto } from "../types/manipuldate-game-dto";

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

        return new Promise(() => {
          socket.emit(GameMessages.RESIGN, payload);
        });
      },
    }),
    abort: builder.mutation<string, ManipulateGameDto>({
      queryFn: (payload) => {
        const socket = getSocket();
        return new Promise((resolve) => {
          socket.emit(GameMessages.ABORT_GAME, payload, (message: string) => {
            resolve({ data: message });
          });
        });
      },
    }),
    getRematchData: builder.query<RematchData | undefined, string>({
      query: (gameId) => `/rematch/${gameId}`,
      providesTags: ["Rematch"],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        await cacheDataLoaded;

        const socket = getSocket();

        socket.on(GameMessages.REMATCH_ACCEPTED, (rematchData: RematchData) => {
          updateCachedData(() => rematchData);
        });

        socket.on(GameMessages.OFFER_REMATCH, (rematchData: RematchData) => {
          updateCachedData(() => rematchData);
        });

        await cacheEntryRemoved;
        socket.off(GameMessages.REMATCH_ACCEPTED);
        socket.off(GameMessages.OFFER_REMATCH);
      },
    }),
    offerRematch: builder.mutation<RematchData, ManipulateGameDto>({
      queryFn: (payload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(
            GameMessages.OFFER_REMATCH,
            payload,
            (data: RematchData) => {
              resolve({ data });
            }
          );
        });
      },
      invalidatesTags: ["Rematch"],
    }),
    cancelRematch: builder.mutation<RematchData, ManipulateGameDto>({
      queryFn: (payload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit(
            GameMessages.CANCEL_REMATCH,
            payload,
            (data: RematchData) => {
              resolve({ data });
            }
          );
        });
      },
      invalidatesTags: ["Rematch"],
    }),
  }),
});
