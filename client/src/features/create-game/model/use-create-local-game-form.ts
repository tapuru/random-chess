"use client";
import { gameActions, getTimeControlFromSeconds } from "@/entities/game";
import { playersActions } from "@/entities/player";
import { useRouter } from "@/shared/config/navigation";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import { GameStatus } from "@/shared/types/game-status";
import { GameTypes } from "@/shared/types/game-type";
import { TimeControls } from "@/shared/types/time-controls";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateLocalGameFormData {
  mode: GameModes;
  isWithTime: boolean;
  time: string;
  isWithTimeIncrement: boolean;
  timeIncrement: string;
  timeControl: TimeControls | null;
}

export const useCreateLocalGameForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState, watch } =
    useForm<CreateLocalGameFormData>({
      defaultValues: {
        mode: GameModes.CLASSICAL,
        isWithTime: false,
        isWithTimeIncrement: false,
        time: "600",
        timeIncrement: "50",
      },
    });
  const router = useRouter();
  const t = useTranslations("CreateGame");

  const currentTime = watch("time");
  const currentTimeControl = getTimeControlFromSeconds(parseInt(currentTime));

  const submit: SubmitHandler<CreateLocalGameFormData> = (data) => {
    let time: number | null = parseInt(data.time);

    let additionTime: number | null = parseInt(data.timeIncrement);
    if (Number.isNaN(time)) time = null;
    if (Number.isNaN(additionTime)) additionTime = null;
    const timeControl = data.timeControl;

    dispatch(
      gameActions.setGameSettings({
        type: GameTypes.LOCAL,
        mode: data.mode,
        time,
        additionTime,
        timeControl: timeControl || getTimeControlFromSeconds(time ?? -1),
      })
    );
    dispatch(
      playersActions.setPlayerOne({
        color: ChessColors.WHITE,
        timeLeft: time,
        type: "basic",
        loses: 0,
        wins: 0,
        isWinner: false,
      })
    );
    dispatch(
      playersActions.setPlayerTwo({
        color: ChessColors.BLACK,
        timeLeft: time,
        type: "basic",
        loses: 0,
        wins: 0,
        isWinner: false,
      })
    );
    dispatch(
      gameActions.setGame({
        currentTurn: ChessColors.WHITE,
        initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: [],
        status: GameStatus.PENDING,
      })
    );
    router.push("/game/local");
  };

  return {
    t,
    submit,
    currentTimeControl,
    control,
    handleSubmit,
    formState,
  };
};
