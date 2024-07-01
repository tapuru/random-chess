"use client";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { AppSelect } from "@/shared/ui/app-select/app-select";
import cl from "./create-local-game-form.module.scss";
import { AppCheckbox } from "@/shared/ui/app-checkbox/app-checkbox";
import { AppSlider } from "@/shared/ui/app-slider/app-slider";
import { GameModes } from "@/shared/types/game-modes";
import { Controller } from "react-hook-form";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { AppInput } from "@/shared/ui/app-input/app-input";
import { AppText } from "@/shared/ui/app-text/app-text";
import { useCreateLocalGameForm } from "../../model/use-create-local-game-form";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { TimeControlField } from "../time-control-field/time-control-field";
import { TimeIncrementField } from "../time-control-field/time-increment-field";

export const CreateLocalGameForm = () => {
  const { control, currentTimeControl, formState, handleSubmit, submit, t } =
    useCreateLocalGameForm();

  return (
    <AppCard.Content>
      <AppForm onSubmit={handleSubmit(submit)}>
        <div className={cl.mode}>
          <AppForm.RHFField
            required
            name="mode"
            label={`${t("mode")}:`}
            labelPosition="left"
            isError={!!formState.errors.mode}
            errorMessages={[formState.errors.mode?.message ?? ""]}
            control={control}
            render={({ field }) => (
              <AppSelect
                {...field}
                value={field.value as string}
                required
                onValueChange={field.onChange}
                options={[
                  { title: "classical", value: GameModes.CLASSICAL },
                  { title: "fisher", value: GameModes.FISHER },
                ]}
              />
            )}
          />
        </div>
        <TimeControlField
          control={control}
          currentTimeControl={currentTimeControl}
          name="time"
        />
        <TimeIncrementField control={control} name="timeIncrement" />
        <div className={cl.submit}>
          <AppButton>{t("create")}</AppButton>
        </div>
      </AppForm>
    </AppCard.Content>
  );
};
