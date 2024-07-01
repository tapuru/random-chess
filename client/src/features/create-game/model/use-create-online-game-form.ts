import { useForm } from "react-hook-form";
import {
  CreateOnlineGameFormData,
  createOnlineGameSchema,
} from "../lib/schemas/create-online-game-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import { getTimeControlFromSeconds } from "@/entities/game";
import { useState } from "react";

export const useCreateOnlineGameForm = () => {
  const { control, formState, watch } = useForm<CreateOnlineGameFormData>({
    resolver: zodResolver(createOnlineGameSchema),
    defaultValues: {
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      ownerColor: ChessColors.WHITE,
      ownerId: "",
      settings: {
        gameMode: GameModes.CLASSICAL,
        time: 0,
        timeIncrement: 0,
      },
    },
  });

  const currentTime = watch("settings.time");
  const currentTimeControl = currentTime
    ? getTimeControlFromSeconds(currentTime)
    : null;

  return {
    control,
    formState,
    currentTimeControl,
  };
};
