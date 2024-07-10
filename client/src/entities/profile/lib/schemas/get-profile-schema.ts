import { z } from "zod";

export const getProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  isOnline: z.boolean(),
  isInGame: z.boolean(),
  upForRematch: z.boolean(),
});

export type GetProfileDto = z.infer<typeof getProfileSchema>;
