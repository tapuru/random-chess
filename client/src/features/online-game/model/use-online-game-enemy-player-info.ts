import {
  gameApi,
  getEnemyPlayer,
  getFrendlyPlayerColor,
  getOppositeColor,
} from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useRouter } from "@/shared/config/navigation";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { ChessColors } from "@/shared/types/chess-colors";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useOnlineGameEnemyPlayerInfo = () => {
  const params = useParams<{ gameId: string }>();
  const {
    data: game,
    isLoading: isGameLoading,
    isError: isGameError,
    isSuccess: isGameSuccess,
    error: gameError,
  } = gameApi.useGetGameQuery(params?.gameId || skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: me,
    isLoading: isMeLoading,
    isError: isMeError,
    error: meError,
    isSuccess: isMeSuccess,
  } = profileApi.useGetMeQuery();
  const { handleApiError } = useHandleApiError();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (game && game.whiteTimeLeft && game.blackTimeLeft && me) {
      const enemyPlayerColor = getOppositeColor(
        getFrendlyPlayerColor(game, me.id)
      );
      const timeLeft =
        enemyPlayerColor === ChessColors.WHITE
          ? game.whiteTimeLeft
          : game.blackTimeLeft;
      console.log(game);
      setTimeLeft(timeLeft);
    }
  }, [game, me]);

  if (isMeError) {
    handleApiError(meError, (message) => {
      toast.error(message, getErrorToastConfig());
      router.push("/login");
    });
  }
  if (isGameError) {
    handleApiError(gameError, (message) => {
      toast.error(message, getErrorToastConfig());
      router.push("/");
    });
  }

  const enemyPlayer = getEnemyPlayer(me?.id, game);
  if (!enemyPlayer || !game) return null;
  const enemyPlayerColor = getFrendlyPlayerColor(game, enemyPlayer.id);

  const isLoading = isMeLoading || isGameLoading;
  const isSuccess = isMeSuccess || isGameSuccess;

  return {
    isLoading,
    isSuccess,
    enemyPlayer,
    game,
    enemyPlayerColor,
    timeLeft,
    setTimeLeft,
  };
};
