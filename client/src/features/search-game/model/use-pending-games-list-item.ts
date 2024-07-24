import { selectUser } from "@/entities/auth";
import { gameApi } from "@/entities/game";
import { GameDto } from "@/entities/game/types/game-dto";
import { useRouter } from "@/shared/config/navigation";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { ChessColors } from "@/shared/types/chess-colors";
import { toast } from "react-toastify";

export const usePendingGamesListItem = (game: GameDto) => {
  const [joinGame] = gameApi.useJoinGameMutation();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const { handleApiError } = useHandleApiError();

  const ownerName = game.playerBlack
    ? game.playerBlack.username
    : game.playerWhite?.username;
  const isWithTimeControl = !game.settings.timeControl;
  const color = game.playerBlack ? ChessColors.WHITE : ChessColors.WHITE;
  const timeToShow = game.settings?.time ? game.settings.time / 60 : "infinite";

  const handleClick = () => {
    if (!user) return;
    try {
      joinGame({ userId: user?.id, gameId: game.id }).unwrap();
      router.push(`/game/${game.id}`);
    } catch (error) {
      handleApiError(error, (message) => {
        toast.error(message, getErrorToastConfig());
      });
    }
  };

  return { handleClick, ownerName, timeToShow, color, isWithTimeControl };
};
