"use client";

import { Control, Controller, FormState } from "react-hook-form";
import cl from "./time-control-field.module.scss";
import { AppCheckbox } from "@/shared/ui/app-checkbox/app-checkbox";
import { useTranslations } from "next-intl";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { AppSlider } from "@/shared/ui/app-slider/app-slider";
import { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { createGameModel } from "../../model/create-game-slice";

interface TimeIncrementFieldProps {
  control: Control<any, any>;
  name: string;
}

export const TimeIncrementField = ({
  control,
  name,
}: TimeIncrementFieldProps) => {
  const t = useTranslations("CreateGame");
  const isWithTime = useAppSelector(createGameModel.selectIsWithTime);
  const isWithTimeIncrement = useAppSelector(
    createGameModel.selectIsWithTimeIncrement
  );
  const dispath = useAppDispatch();
  const checkboxName = useId();
  const handleCheckedChange = (state: boolean) => {
    dispath(createGameModel.setIsWithTimeIncrement(state));
  };

  return (
    <div className={cl.row}>
      <div className={cl.checkbox}>
        <AppCheckbox
          name={checkboxName}
          label={`${t("timeIncrement")}:`}
          onCheckedChange={handleCheckedChange}
          checked={isWithTimeIncrement}
          disabled={!isWithTime}
        />
      </div>
      <div className={cl.sliderValue}>
        <Controller
          name={name}
          control={control}
          disabled={!isWithTimeIncrement}
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
        />{" "}
      </div>
      <div className={cl.slider}>
        <Controller
          control={control}
          name={name}
          disabled={!isWithTimeIncrement}
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
    </div>
  );
};
