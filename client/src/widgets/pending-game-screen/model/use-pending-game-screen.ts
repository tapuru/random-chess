import { selectUser } from "@/entities/auth";
import { gameApi } from "@/entities/game";
//TODO: fix this import
import { GameDto } from "@/entities/game/types/game-dto";
import { profileApi } from "@/entities/profile";
import { useRouter } from "@/shared/config/navigation";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const usePendingGameScreen = (game: GameDto) => {
  const { data: me, isLoading } = profileApi.useGetMeQuery();
  const [joinGame] = gameApi.useJoinGameMutation();
  const user = useAppSelector(selectUser);
  const t = useTranslations("Game");
  const router = useRouter();
  const { handleApiError } = useHandleApiError();

  useEffect(() => {
    if (
      game.playerBlack?.id !== me?.id &&
      game.playerWhite?.id !== me?.id &&
      user
    ) {
      joinGame({ gameId: game.id, userId: user?.id })
        .unwrap()
        .then((joinedGame) => {
          console.log("Joined game: " + joinedGame.id);
        })
        .catch((error) => {
          handleApiError(error, (message) => {
            toast.error(message, getErrorToastConfig());
          });
          router.push("/");
        });
    }
  }, [joinGame, me, game]);

  return {
    isLoading,
    t,
  };
};
