"use client";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { AppSelect } from "@/shared/ui/app-select/app-select";
import cl from "./create-game-form.module.scss";
import { AppCheckbox } from "@/shared/ui/app-checkbox/app-checkbox";
import { AppSlider } from "@/shared/ui/app-slider/app-slider";
import { GameModes } from "@/shared/types/game-modes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { gameActions } from "@/entities/game";
import { GameTypes } from "@/shared/types/game-type";
import { playersActions } from "@/entities/player";
import { useRouter } from "@/shared/config/navigation";
import { ChessColors } from "@/shared/types/chess-colors";

interface CreateGameFormData {
  mode: GameModes;
  test: string;
  isWithTime: boolean;
  time: number;
  isWithAdditionTime: boolean;
  additionTime: number;
}

export const CreateGameForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState } = useForm<CreateGameFormData>({
    defaultValues: {
      mode: GameModes.CLASSICAL,
      isWithTime: false,
      isWithAdditionTime: false,
      time: 50,
      additionTime: 50,
    },
  });
  const router = useRouter();

  const submit: SubmitHandler<CreateGameFormData> = (data) => {
    dispatch(
      gameActions.setGameSettings({
        type: GameTypes.LOCAL,
        mode: data.mode,
        time: data.time ?? null,
        additionTime: data.additionTime ?? null,
      })
    );
    dispatch(
      playersActions.setPlayerOne({
        color: ChessColors.WHITE,
        timeLeft: data.time,
        type: "basic",
        loses: 0,
        wins: 0,
        isWinner: false,
      })
    );
    dispatch(
      playersActions.setPlayerTwo({
        color: ChessColors.BLACK,
        timeLeft: data.time,
        type: "basic",
        loses: 0,
        wins: 0,
        isWinner: false,
      })
    );
    router.push("/game/local");
  };

  return (
    <AppCard>
      <AppCard.Content>
        <form className={cl.form} onSubmit={handleSubmit(submit)}>
          <Controller
            name="mode"
            control={control}
            render={({ field }) => (
              <AppSelect
                {...field}
                onValueChange={field.onChange}
                options={[
                  { title: "classical", value: GameModes.CLASSICAL },
                  { title: "fisher", value: GameModes.FISHER },
                ]}
              />
            )}
          />
          <div className={cl.row}>
            <Controller
              control={control}
              render={({ field }) => (
                <AppCheckbox
                  label="Game time:"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                  {...field}
                  value={""}
                />
              )}
              name="isWithTime"
            />
            <Controller
              control={control}
              name="time"
              disabled={!formState.dirtyFields.isWithTime}
              render={({ field }) => (
                <AppSlider
                  min={0}
                  max={100}
                  {...field}
                  value={[field.value]}
                  onValueChange={([v]) => field.onChange(v)}
                />
              )}
            />
          </div>
          <div className={cl.row}>
            <Controller
              name="isWithAdditionTime"
              control={control}
              disabled={!formState.dirtyFields.isWithTime}
              render={({ field }) => (
                <AppCheckbox
                  label="Addition time:"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                  {...field}
                  value={""}
                />
              )}
            />
            <Controller
              control={control}
              name="additionTime"
              disabled={
                !formState.dirtyFields.isWithTime ||
                !formState.dirtyFields.isWithAdditionTime
              }
              render={({ field }) => (
                <AppSlider
                  min={0}
                  max={100}
                  {...field}
                  value={[field.value]}
                  onValueChange={([v]) => field.onChange(v)}
                />
              )}
            />
          </div>
          <AppButton>submit</AppButton>
        </form>
      </AppCard.Content>
    </AppCard>
  );
};
