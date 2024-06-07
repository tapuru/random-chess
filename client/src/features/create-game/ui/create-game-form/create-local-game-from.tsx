"use client";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { AppSelect } from "@/shared/ui/app-select/app-select";
import cl from "./create-local-game-form.module.scss";
import { AppCheckbox } from "@/shared/ui/app-checkbox/app-checkbox";
import { AppSlider } from "@/shared/ui/app-slider/app-slider";
import { GameModes } from "@/shared/types/game-modes";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { gameActions, getTimeControlsFromSecods } from "@/entities/game";
import { GameTypes } from "@/shared/types/game-type";
import { playersActions } from "@/entities/player";
import { useRouter } from "@/shared/config/navigation";
import { ChessColors } from "@/shared/types/chess-colors";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { useTranslations } from "use-intl";
import { TimeControls } from "@/shared/types/time-controls";
import { AppText } from "@/shared/ui/app-text/app-text";

interface CreateLocalGameFormData {
  mode: GameModes;
  isWithTime: boolean;
  time: string;
  isWithAdditionTime: boolean;
  additionTime: string;
  timeControl: TimeControls | null;
}

export const CreateLocalGameForm = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState, watch } =
    useForm<CreateLocalGameFormData>({
      defaultValues: {
        mode: GameModes.CLASSICAL,
        isWithTime: false,
        isWithAdditionTime: false,
        time: "50",
        additionTime: "50",
      },
    });
  const router = useRouter();
  const t = useTranslations("CreateGame");

  const currentTime = watch("time");

  const submit: SubmitHandler<CreateLocalGameFormData> = (data) => {
    const time = parseInt(data.time);
    const additionTime = parseInt(data.additionTime);
    const timeControl = data.timeControl;

    dispatch(
      gameActions.setGameSettings({
        type: GameTypes.LOCAL,
        mode: data.mode,
        time: time ?? null,
        additionTime: additionTime ?? null,
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

  return (
    <AppCard>
      <AppCard.Content>
        <form className={cl.form} onSubmit={handleSubmit(submit)}>
          <div className={cl.mode}>
            <label htmlFor="mode" className={cl.label}>
              {t("mode")}:
            </label>
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
          </div>
          <div className={cl.row}>
            <div className={cl.checkbox}>
              <Controller
                control={control}
                render={({ field }) => (
                  <AppCheckbox
                    label={`${t("timeControl")}:`}
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    {...field}
                    value={""}
                  />
                )}
                name="isWithTime"
              />
            </div>
            <div className={cl.value}>
              <Controller
                name="time"
                control={control}
                disabled={!formState.dirtyFields.isWithTime}
                render={({ field }) => (
                  <AppInput
                    type="text"
                    className={cl.sliderInput}
                    {...field}
                    value={`${Math.floor(parseInt(field.value) / 60)}m`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let value = parseInt(e.target.value);
                      if (Number.isNaN(value)) {
                        value = 0;
                      }
                      field.onChange(value * 60);
                    }}
                    small
                  />
                )}
              />
            </div>
            <div className={cl.slider}>
              <Controller
                control={control}
                name="time"
                disabled={!formState.dirtyFields.isWithTime}
                render={({ field }) => (
                  <AppSlider
                    min={60}
                    max={60 * 120}
                    {...field}
                    value={[parseInt(field.value)]}
                    onValueChange={([v]) => field.onChange(v)}
                    step={60}
                  />
                )}
              />
            </div>
            <div className={cl.timeControlName}>
              {formState.dirtyFields.isWithTime && (
                <AppText color="text-300">
                  {getTimeControlsFromSecods(parseInt(currentTime))}
                </AppText>
              )}
            </div>
          </div>
          <div className={cl.row}>
            <Controller
              name="isWithAdditionTime"
              control={control}
              disabled={!formState.dirtyFields.isWithTime}
              render={({ field }) => (
                <AppCheckbox
                  label={`${t("additionTime")}:`}
                  onCheckedChange={field.onChange}
                  checked={field.value}
                  {...field}
                  value={""}
                />
              )}
            />
            <Controller
              name="additionTime"
              control={control}
              disabled={!formState.dirtyFields.isWithAdditionTime}
              render={({ field }) => (
                <AppInput
                  type="text"
                  className={cl.sliderInput}
                  {...field}
                  value={`${parseInt(field.value)}s`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = parseInt(e.target.value);
                    if (Number.isNaN(value)) {
                      value = 0;
                    }
                    field.onChange(value * 60);
                  }}
                  small
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
                  value={[parseInt(field.value)]}
                  onValueChange={([v]) => field.onChange(v)}
                  className={cl.slider}
                />
              )}
            />
          </div>
          <div className={cl.submit}>
            <AppButton>{t("create")}</AppButton>
          </div>
        </form>
      </AppCard.Content>
    </AppCard>
  );
};
