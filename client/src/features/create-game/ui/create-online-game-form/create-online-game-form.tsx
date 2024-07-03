import { useForm } from "react-hook-form";
import { useCreateOnlineGameForm } from "../../model/use-create-online-game-form";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { AppSelect } from "@/shared/ui/app-select/app-select";
import { GameModes } from "@/shared/types/game-modes";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { useTranslations } from "next-intl";
import { TimeControlField } from "../time-control-field/time-control-field";
import { TimeIncrementField } from "../time-control-field/time-increment-field";
import { AppButton } from "@/shared/ui/app-button/app-button";

export const CreateOnlineGameForm = () => {
  const { control, currentTimeControl, handleSubmit } =
    useCreateOnlineGameForm();
  const t = useTranslations("CreateGame");
  return (
    <AppCard.Content>
      <AppForm onSubmit={handleSubmit}>
        <AppForm.RHFField
          name="settings.gameMode"
          label={t("mode")}
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
        <AppForm.Submit>
          <AppButton>create game</AppButton>
        </AppForm.Submit>
      </AppForm>
    </AppCard.Content>
  );
};
