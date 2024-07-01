"use client";

import { Control, Controller, FormState } from "react-hook-form";
import cl from "./time-control-field.module.scss";
import { AppCheckbox } from "@/shared/ui/app-checkbox/app-checkbox";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { AppSlider } from "@/shared/ui/app-slider/app-slider";
import { AppText } from "@/shared/ui/app-text/app-text";
import { useTranslations } from "next-intl";
import { TimeControls } from "@/shared/types/time-controls";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { createGameModel } from "../../model/create-game-slice";
import { useId } from "react";

interface TimeControlFieldProps {
  control: Control<any, any>;
  currentTimeControl: TimeControls | null;
  name: string;
}

export const TimeControlField = ({
  currentTimeControl,
  control,
  name,
}: TimeControlFieldProps) => {
  const t = useTranslations("CreateGame");
  const dispath = useAppDispatch();
  const isWithTime = useAppSelector(createGameModel.selectIsWithTime);
  const checkboxName = useId();
  const handleCheckedChange = (state: boolean) => {
    dispath(createGameModel.setIsWithTime(state));
  };

  return (
    <div className={cl.row}>
      <div className={cl.checkbox}>
        <AppCheckbox
          label={`${t("timeControl")}:`}
          onCheckedChange={handleCheckedChange}
          checked={isWithTime}
          value={""}
          name={checkboxName}
        />
      </div>
      <div className={cl.sliderValue}>
        <Controller
          name={name}
          control={control}
          disabled={!isWithTime}
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
          name={name}
          disabled={!isWithTime}
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
        {isWithTime && <AppText color="text-300">{currentTimeControl}</AppText>}
      </div>
    </div>
  );
};
