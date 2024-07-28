"use client";

import { AppDropdownMenu } from "@/shared/ui/app-dropdown-menu/app-dropdown-menu";
import { AppForm } from "@/shared/ui/app-form/app-form";
import { useParams, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoOptionsOutline } from "react-icons/io5";
import {
  FiltersFormData,
  filtersSchema,
} from "../../lib/schemas/filters-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppSelect } from "@/shared/ui/app-select/app-select";
import { useTranslations } from "next-intl";
import { ChessColors } from "@/shared/types/chess-colors";
import { TimeControls } from "@/shared/types/time-controls";
import cl from "./pending-games-filters.module.scss";
import { GameModes } from "@/shared/types/game-modes";
import { usePathname, useRouter } from "@/shared/config/navigation";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useState } from "react";

export const PendingGamesFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { control, handleSubmit } = useForm<FiltersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      mode: GameModes.CLASSICAL,
      ownerColor: (searchParams?.get("ownerColor") as ChessColors) ?? "all",
      timeControl: (searchParams?.get("timeControl") as TimeControls) ?? "all",
    },
  });
  const t = useTranslations("CreateGame");
  const searchGameT = useTranslations("SearchGame");
  const [open, setOpen] = useState(false);

  const submit: SubmitHandler<FiltersFormData> = (data) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (data.ownerColor) {
      data.ownerColor === "all"
        ? params.delete("ownerColor")
        : params.set("ownerColor", data.ownerColor);
    }
    if (data.timeControl) {
      data.timeControl === "all"
        ? params.delete("timeControl")
        : params.set("timeControl", data.timeControl);
    }
    replace(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <AppDropdownMenu
      onOpenChange={(state) => setOpen(state)}
      open={open}
      trigger={
        <button className={cl.trigger}>
          <IoOptionsOutline size={24} />
        </button>
      }
      withArrow
    >
      <AppForm onSubmit={handleSubmit(submit)} className={cl.form}>
        <AppForm.RHFField
          name="ownerColor"
          label={t("ownerColor") + ":"}
          labelPosition="left"
          control={control}
          render={({ field }) => (
            <AppSelect
              {...field}
              onValueChange={field.onChange}
              value={field.value as string}
              options={[
                { title: searchGameT("all"), value: "all" },
                { title: t("white"), value: ChessColors.BLACK },
                { title: t("black"), value: ChessColors.WHITE },
              ]}
            />
          )}
        />
        <AppForm.RHFField
          name="timeControl"
          label={t("timeControl") + ":"}
          labelPosition="left"
          control={control}
          render={({ field }) => (
            <AppSelect
              {...field}
              onValueChange={field.onChange}
              value={field.value as string}
              options={[
                { title: searchGameT("all"), value: "all" },
                { title: "bullet", value: TimeControls.BULLET },
                { title: "blitz", value: TimeControls.BLITZ },
                { title: "rapid", value: TimeControls.RAPID },
                { title: "classical", value: TimeControls.CLASSICAL },
              ]}
            />
          )}
        />
        <AppForm.Submit>
          <AppButton size="sm">{searchGameT("apply")}</AppButton>
        </AppForm.Submit>
      </AppForm>
    </AppDropdownMenu>
  );
};
