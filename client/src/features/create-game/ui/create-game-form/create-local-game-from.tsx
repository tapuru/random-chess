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
          <div className={cl.sliderValue}>
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
              <AppText color="text-300">{currentTimeControl}</AppText>
            )}
          </div>
        </div>
        <div className={cl.row}>
          <div className={cl.checkbox}>
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
          </div>
          <div className={cl.sliderValue}>
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
            />{" "}
          </div>
          <div className={cl.slider}>
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
        </div>
        <div className={cl.submit}>
          <AppButton>{t("create")}</AppButton>
        </div>
      </AppForm>
    </AppCard.Content>
  );
};
