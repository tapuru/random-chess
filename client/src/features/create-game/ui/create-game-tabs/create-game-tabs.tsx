"use client";

import { useRouter } from "@/shared/config/navigation";
import { GameTypes } from "@/shared/types/game-type";
import { AppTabs } from "@/shared/ui/app-tabs/app-tabs";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { CreateLocalGameForm } from "../create-local-game-form/create-local-game-from";
import { CreateOnlineGameForm } from "../create-online-game-form/create-online-game-form";

export const CreateGameTabs = () => {
  const params = useParams<{ type: string }>();
  const router = useRouter();
  const t = useTranslations("CreateGame");

  const handleValueChange = (value: string) => {
    router.push(`/create/${value}`);
  };

  return (
    <AppTabs
      value={params?.type}
      onValueChange={handleValueChange}
      tabs={[
        {
          value: GameTypes.LOCAL,
          content: <CreateLocalGameForm />,
          label: "Local",
        },
        {
          value: GameTypes.ONLINE,
          content: <CreateOnlineGameForm />,
          label: "Online",
        },
        {
          value: GameTypes.ENGINE,
          content: "create engine game form",
          label: "Engine",
        },
      ]}
    />
  );
};
