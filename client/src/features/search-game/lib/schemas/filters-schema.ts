import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import { TimeControls } from "@/shared/types/time-controls";
import { z } from "zod";

export const filtersSchema = z.object({
  mode: z.nativeEnum(GameModes).or(z.string()).optional(),
  ownerColor: z.enum([ChessColors.BLACK, ChessColors.WHITE, "all"]).optional(),
  timeControl: z
    .enum([
      TimeControls.CLASSICAL,
      TimeControls.BLITZ,
      TimeControls.BULLET,
      TimeControls.RAPID,
      "all",
    ])
    .optional(),
});

export type FiltersFormData = z.infer<typeof filtersSchema>;
