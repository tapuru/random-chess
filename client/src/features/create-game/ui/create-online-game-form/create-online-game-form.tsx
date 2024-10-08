import { useCreateOnlineGameForm } from "../../model/use-create-online-game-form";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { AppSelect } from "@/shared/ui/app-select/app-select";
import { GameModes } from "@/shared/types/game-modes";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { useTranslations } from "next-intl";
import { TimeControlField } from "../time-control-field/time-control-field";
import { TimeIncrementField } from "../time-control-field/time-increment-field";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { ChessColors } from "@/shared/types/chess-colors";
import cl from "./create-online-game-form.module.scss";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { AppAlert } from "@/shared/ui/app-alert/app-alert";

export const CreateOnlineGameForm = () => {
  const { control, currentTimeControl, handleSubmit, isLoading, serverError } =
    useCreateOnlineGameForm();
  const t = useTranslations("CreateGame");
  return (
    <AppCard.Content className={cl.root}>
      <AppForm onSubmit={handleSubmit}>
        <AppForm.RHFField
          name="settings.gameMode"
          label={t("mode") + ":"}
          labelPosition="left"
          control={control}
          render={({ field }) => (
            <AppSelect
              {...field}
              onValueChange={field.onChange}
              value={field.value as string}
              options={[
                { title: "classical", value: GameModes.CLASSICAL },
                { title: "fisher", value: GameModes.FISHER },
                { title: "unfair fisher", value: GameModes.UNFAIR_FISHER },
                { title: "random", value: GameModes.RANDOM },
                { title: "unfair random", value: GameModes.UNFAIR_RANDOM },
              ]}
            />
          )}
        />
        <TimeControlField
          control={control}
          currentTimeControl={currentTimeControl}
          name="settings.time"
        />
        <TimeIncrementField control={control} name="settings.timeIncrement" />
        <AppForm.RHFField
          name="ownerColor"
          control={control}
          label={t("ownerColor") + ":"}
          labelPosition="left"
          render={({ field }) => (
            <AppSelect
              {...field}
              onValueChange={field.onChange}
              value={field.value as string}
              options={[
                {
                  title: t("white"),
                  value: ChessColors.WHITE,
                },
                {
                  title: t("black"),
                  value: ChessColors.BLACK,
                },
              ]}
            />
          )}
        />
        <AppForm.Submit justifyContent="flex-start">
          <AppButton disabled={isLoading}>{t("createGame")}</AppButton>
          {isLoading && <AppLoader size="sm" />}
        </AppForm.Submit>
        {serverError && <AppAlert variant="error">{serverError}</AppAlert>}
      </AppForm>
    </AppCard.Content>
  );
};
