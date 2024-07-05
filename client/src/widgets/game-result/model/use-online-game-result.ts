import {
  gameApi,
  getFrendlyPlayerColor,
  getGameResultDetails,
} from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { skipToken } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useOnlineGameResult = () => {
  const params = useParams<{ gameId: string }>();
  const [open, setOpen] = useState(false);
  const { data: game } = gameApi.useGetGameQuery(params?.gameId || skipToken);
  const { data: profile } = profileApi.useGetMeQuery();
  const t = useTranslations("Game");
  useEffect(() => {
    if (game?.result) {
      setOpen(true);
    }
  }, [game]);

  if (!game || !profile || !game.result) return null;
  const frendlyPlayerColor = getFrendlyPlayerColor(game, profile.id);

  const { reason, title, titleColor } = getGameResultDetails({
    gameResult: game.result,
    gameType: game.settings.type,
    frendlyPlayerColor,
    t,
  });

  return {
    reason,
    title,
    titleColor,
    open,
    setOpen,
  };
};
