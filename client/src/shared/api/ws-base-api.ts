import io, { Socket } from "socket.io-client";
import { apiSlice } from "./api-slice";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
      withCredentials: true,
    });
  }
  return socket;
};

const wsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initConnection: builder.query<any, void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.on("connect", () => {
            console.log("connected!");
          });

          socket.on("disconnect", () => {
            console.log("disconneted");
          });

          await cacheEntryRemoved;
          socket.off("connect");
          socket.off("disconnect");
        } catch (error) {}
      },
    }),
  }),
});

export const wsBaseApi = {
  getSocket,
  useInitConnectionQuery: wsApiSlice.useInitConnectionQuery,
};
