import { apiSlice } from "@/shared/api/api-slice";
import { GetProfileDto } from "../lib/schemas/get-profile-schema";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<GetProfileDto, void>({
      query: () => "/profile/me",
      providesTags: ["Me"],
    }),
  }),
});
