import { gameApi, getFrendlyPlayerColor } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useRouter } from "@/shared/config/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { ChessColors } from "@/shared/types/chess-colors";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { onlineGameModel } from "./online-game-slice";

export const useOnlineGameFrendlyPlayerInfo = () => {
  const {
    data: me,
    isLoading,
    isError,
    error,
    isSuccess,
  } = profileApi.useGetMeQuery();
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
  const { handleApiError } = useHandleApiError();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
  if (isError) {
    handleApiError(error, (message) => {
      toast.error(message, getErrorToastConfig());
      router.push("/login");
    });
  }

  useEffect(() => {
    if (game && game.whiteTimeLeft && game.blackTimeLeft && me) {
      const frendlyPlayerColor = getFrendlyPlayerColor(game, me.id);
      const timeLeft =
        frendlyPlayerColor === ChessColors.WHITE
          ? game.whiteTimeLeft
          : game.blackTimeLeft;
      setTimeLeft(timeLeft);
    }
  }, [game, me]);

  if (!game || !me) return null;
  const frendlyPlayerColor = getFrendlyPlayerColor(game, me.id);

  return {
    game,
    frendlyPlayerColor,
    timeLeft,
    me,
    isLoading,
    isSuccess,
    setTimeLeft,
  };
};
