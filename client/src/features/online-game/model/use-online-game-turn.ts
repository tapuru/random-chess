import { gameApi, getFrendlyPlayerColor } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useRouter } from "@/shared/config/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useOnlineGameTurn = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading: isGameLoading } = gameApi.useGetGameQuery(
    params?.gameId || skipToken
  );
  const { data: profile } = profileApi.useGetMeQuery();
  const { data: rematchData, isLoading: isRematchDataLoading } =
    gameApi.useGetRematchDataQuery(params?.gameId ?? skipToken);
  const t = useTranslations("Game");
  const router = useRouter();

  useEffect(() => {
    if (rematchData?.newGameId) {
      router.push(`/game/${rematchData.newGameId}`);
    }
  }, [rematchData, router]);

  if (!game || !profile) return null;
  const frendlyPlayerColor = getFrendlyPlayerColor(game, profile.id);

  const isLoading = isRematchDataLoading || isGameLoading;

  return { frendlyPlayerColor, isLoading, t, game };
};
