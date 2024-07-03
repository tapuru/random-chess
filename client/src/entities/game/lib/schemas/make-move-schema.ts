import { z } from "zod";

export const makeMoveSchema = z.object({
  from: z.string(),
  to: z.string(),
});
