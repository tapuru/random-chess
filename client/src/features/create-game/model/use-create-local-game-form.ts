"use client";
import { gameActions, getTimeControlsFromSecods } from "@/entities/game";
import { playersActions } from "@/entities/player";
import { useRouter } from "@/shared/config/navigation";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import { GameTypes } from "@/shared/types/game-type";
import { TimeControls } from "@/shared/types/time-controls";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateLocalGameFormData {
  mode: GameModes;
  isWithTime: boolean;
  time: string;
  isWithAdditionTime: boolean;
  additionTime: string;
  timeControl: TimeControls | null;
}

export const useCreateLocalGameForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState, watch } =
    useForm<CreateLocalGameFormData>({
      defaultValues: {
        mode: GameModes.CLASSICAL,
        isWithTime: false,
        isWithAdditionTime: false,
        time: "600",
        additionTime: "50",
      },
    });
  const router = useRouter();
  const t = useTranslations("CreateGame");

  const currentTime = watch("time");
  const currentTimeControl = getTimeControlsFromSecods(parseInt(currentTime));

  const submit: SubmitHandler<CreateLocalGameFormData> = (data) => {
    let time: number | null = parseInt(data.time);

    let additionTime: number | null = parseInt(data.additionTime);
    if (Number.isNaN(time)) time = null;
    if (Number.isNaN(additionTime)) additionTime = null;
    const timeControl = data.timeControl;

    dispatch(
      gameActions.setGameSettings({
        type: GameTypes.LOCAL,
        mode: data.mode,
        time,
        additionTime,
        timeControl: timeControl || getTimeControlsFromSecods(time),
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
