import { gameApi, getEnemyPlayer } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useRouter } from "@/shared/config/navigation";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export const useOnlineGameEnemyPlayerInfo = () => {
  const params = useParams<{ gameId: string }>();
  const {
    data: game,
    isLoading: isGameLoading,
    isError: isGameError,
    isSuccess: isGameSuccess,
    error: gameError,
  } = gameApi.useGetGameQuery(params?.gameId || skipToken);
  const {
    data: me,
    isLoading: isMeLoading,
    isError: isMeError,
    error: meError,
    isSuccess: isMeSuccess,
  } = profileApi.useGetMeQuery();
  const { handleApiError } = useHandleApiError();
  const router = useRouter();

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

  const isLoading = isMeLoading || isGameLoading;
  const isSuccess = isMeSuccess || isGameSuccess;

  return {
    isLoading,
    isSuccess,
    enemyPlayer,
  };
};
