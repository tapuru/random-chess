import { apiSlice } from "@/shared/api/api-slice";
import { CreateOnlineGameFormData } from "../lib/schemas/create-online-game-schema";
import { getSocket } from "@/shared/api/ws-base-api";
import { GameMessages } from "../types/game-messages";
import { GameDto } from "../types/game-dto";

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
      providesTags: ["Game"],
    }),
  }),
});
