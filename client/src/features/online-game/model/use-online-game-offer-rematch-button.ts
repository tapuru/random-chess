import { selectUser } from "@/entities/auth";
import { gameApi, getFrendlyPlayerColor } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameStatus } from "@/shared/types/game-status";
import { skipToken } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const useOnlineGameOfferRematchButton = (
  onOfferRematch?: () => void
) => {
  const t = useTranslations("Game");
  //TODO: rewrite this all
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading: isGameLoading } = gameApi.useGetGameQuery(
    params?.gameId || skipToken
  );
  const [offerRematch, { isLoading: isRematchOfferMutationLoading }] =
    gameApi.useOfferRematchMutation();
  const user = useAppSelector(selectUser);
  const {
    data: frendlyPlayer,
    refetch: refetchProfile,
    isLoading: isPlayerDataLoading,
  } = profileApi.useGetMeQuery();
  const { data: rematchData, isLoading: isRematchDataLoading } =
    gameApi.useGetRematchDataQuery();

  if (!user || !game || game.status !== GameStatus.FINISHED || !frendlyPlayer)
    return null;
  const frendlyPlayerColor = getFrendlyPlayerColor(game, frendlyPlayer.id);
  const enemyPlayer =
    frendlyPlayerColor === ChessColors.BLACK
      ? game.playerWhite
      : game.playerBlack;
  if (!enemyPlayer) return null;

  const isLoading =
    isGameLoading ||
    isRematchDataLoading ||
    isRematchDataLoading ||
    isPlayerDataLoading;

  const handleClick = async () => {
    try {
      const message = await offerRematch({
        gameId: game.id,
        userId: user.id,
      }).unwrap();
      console.log("HERE");
      console.log(message);
      refetchProfile();
      onOfferRematch?.();
    } catch (error) {
      //TODO: handle error
    }
  };
  let title = t("rematch");
  let rematchOfferSent = false;
  if (rematchData?.upForRematchIds.includes(user.id)) {
    rematchOfferSent = true;
  } else if (
    !!rematchData?.upForRematchIds?.length &&
    rematchData.upForRematchIds.length > 0
  ) {
    title = t("acceptRematch");
  }

  return {
    handleClick,
    isLoading,
    rematchOfferSent,
    title,
  };
};
