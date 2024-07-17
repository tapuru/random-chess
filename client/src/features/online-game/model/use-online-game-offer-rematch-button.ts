import { selectUser } from "@/entities/auth";
import { gameApi, getFrendlyPlayerColor } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameStatus } from "@/shared/types/game-status";
import { skipToken } from "@reduxjs/toolkit/query";
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
  const [
    offerRematch,
    { isLoading: isRematchOfferMutationLoading, reset: resetOfferRematch },
  ] = gameApi.useOfferRematchMutation();
  const [cancelRematch, { isLoading: isRematchCancelLoading, isSuccess }] =
    gameApi.useCancelRematchMutation();
  const user = useAppSelector(selectUser);
  const { data: frendlyPlayer, isLoading: isPlayerDataLoading } =
    profileApi.useGetMeQuery();
  const { data: rematchData, isLoading: isRematchDataLoading } =
    gameApi.useGetRematchDataQuery(params?.gameId ?? skipToken);

  const { handleApiError } = useHandleApiError();

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
    isPlayerDataLoading ||
    isRematchCancelLoading;

  const handleRematchClick = async () => {
    try {
      const message = await offerRematch({
        gameId: game.id,
        userId: user.id,
      }).unwrap();
      onOfferRematch?.();
    } catch (error) {
      handleApiError(error, (message) => {
        toast.error(message, getErrorToastConfig());
      });
    }
  };

  const handleCancelClick = async () => {
    try {
      const message = await cancelRematch({ gameId: game.id, userId: user.id });
    } catch (error) {
      handleApiError(error, (message) => {
        toast.error(message, getErrorToastConfig());
      });
    }
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
    handleCancelClick,
    handleRematchClick,
    isLoading,
    rematchOfferSent,
    title,
  };
};
