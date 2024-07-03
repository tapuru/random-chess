import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";
import { TimeControls } from "@/shared/types/time-controls";
import { z } from "zod";

export const createOnlineGameSchema = z.object({
  initialFen: z.string({ required_error: "initialFenRequiredError" }),
  ownerId: z.string({ required_error: "ownerIdRequiredError" }),
  ownerColor: z.nativeEnum(ChessColors, {
    required_error: "ownerColorRequiredError",
  }),
  settings: z.object({
    gameType: z.nativeEnum(GameTypes),
    gameMode: z.nativeEnum(GameModes, {
      required_error: "gameModeRequiredError",
    }),
    timeControl: z.nativeEnum(TimeControls).optional(),
    time: z.number().optional(),
    timeIncrement: z.number().optional(),
  }),
});

export type CreateOnlineGameFormData = z.infer<typeof createOnlineGameSchema>;
