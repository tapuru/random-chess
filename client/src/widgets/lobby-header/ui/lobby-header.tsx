"use client";

import { useSearchParams } from "next/navigation";
import { LobbyHeaderLayout } from "./lobby-header-layout/lobby-header-layout";
import { CreateGameButton } from "@/features/create-game";
import { useTranslations } from "next-intl";

export const LobbyHeader = () => {
  const searchParams = useSearchParams();
  const activeMode = searchParams?.get("mode");
  const t = useTranslations("GameModes");

  if (!activeMode) return null;

  return (
    <LobbyHeaderLayout title={t(activeMode)} action={<CreateGameButton />} />
  );
};
