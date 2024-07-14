import { apiSlice } from "@/shared/api/api-slice";
import { ProfileDto } from "../types/profile-dto";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<ProfileDto, void>({
      query: () => "/profile/me",
      providesTags: ["Me"],
    }),
    getProfile: builder.query<ProfileDto, string>({
      query: (id) => `/profile/${id}`,
    }),
  }),
});
