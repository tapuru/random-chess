import { z } from "zod";

export const getProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export type GetProfileDto = z.infer<typeof getProfileSchema>;
