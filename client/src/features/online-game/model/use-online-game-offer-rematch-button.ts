import { selectUser } from "@/entities/auth";
import { gameApi, getFrendlyPlayerColor } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import {
  ApiErrors,
  apiErrorSchema,
  isApiError,
} from "@/shared/lib/api-helpers";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameStatus } from "@/shared/types/game-status";
import { skipToken } from "@reduxjs/toolkit/query";
import { profile } from "console";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

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
    gameApi.useGetRematchDataQuery(params?.gameId ?? skipToken);
  const errorT = useTranslations("ApiErrors");

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
    isRematchOfferMutationLoading ||
    isRematchDataLoading ||
    isPlayerDataLoading;

  const handleRematchClick = async () => {
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
      if (isApiError(error)) {
        let message: string;
        const result = apiErrorSchema.safeParse(error.data.message);
        result.success
          ? (message = errorT(result.data))
          : (message = errorT(ApiErrors.UNEXPECTED));
        toast.error(message, getErrorToastConfig());
      } else {
        toast.error(errorT(ApiErrors.UNEXPECTED), getErrorToastConfig());
        console.log(error);
      }
    }
  };

  const handleCancelCick = () => {
    //TODO: handle rematch cancel
    // try {
    //   const data = await;
    // } catch (error) {}
  };
  let title = t("rematch");
  let rematchOfferSent = false;
  if (
    (rematchData?.blackUpForRematch &&
      frendlyPlayerColor === ChessColors.BLACK) ||
    (rematchData?.whiteUpForRematch && frendlyPlayerColor === ChessColors.WHITE)
  ) {
    rematchOfferSent = true;
    title = t("cancelRematch");
  } else if (rematchData?.blackUpForRematch || rematchData?.whiteUpForRematch) {
    title = t("acceptRematch");
  }

  return {
    handleCancelCick,
    handleRematchClick,
    isLoading,
    rematchOfferSent,
    title,
  };
};
