"use client";

import { locales } from "@/shared/config/navigation";
import { AppSelect, AppSelectOption } from "@/shared/ui/app-select/app-select";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const LanguageSelect = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const activeLocale = useLocale();

  const options: AppSelectOption[] = locales.map((l) => ({
    title: l,
    value: l,
  }));

  const onChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}`);
    });
  };

  return (
    <AppSelect
      variant="underlined"
      options={options}
      onValueChange={onChange}
      defaultValue={activeLocale}
    />
  );
};
