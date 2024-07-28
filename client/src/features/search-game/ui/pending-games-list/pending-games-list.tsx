"use client";
import { gameApi } from "@/entities/game";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSearchParams } from "next/navigation";
import cl from "./pending-games-list.module.scss";
import { GameDto } from "@/entities/game/types/game-dto";
import { AppText } from "@/shared/ui/app-text/app-text";
import { ChessColors } from "@/shared/types/chess-colors";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectUser } from "@/entities/auth";
import { useRouter } from "@/shared/config/navigation";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { toast } from "react-toastify";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { useTranslations } from "next-intl";
import { usePendingGamesListItem } from "../../model/use-pending-games-list-item";

const PendingGamesListItem = ({ game }: { game: GameDto }) => {
  const { color, handleClick, isWithTimeControl, ownerName, timeToShow } =
    usePendingGamesListItem(game);

  return (
    <li className={cl.item} onClick={handleClick}>
      <AppText>{ownerName}</AppText>
      {isWithTimeControl ? (
        <AppText>Infinite</AppText>
      ) : (
        <AppText>{`${game.settings.timeControl} ${timeToShow}+${game.settings.timeIncrement ?? 0}`}</AppText>
      )}
      <AppText>{color}</AppText>
    </li>
  );
};

export const PendingGamesList = () => {
  const searchParams = useSearchParams();

  const {
    data: games,
    isLoading,
    isSuccess,
    isError,
    error,
  } = gameApi.useGetGamesQuery(
    {
      mode: searchParams?.get("mode") ?? undefined,
      ownerColor: searchParams?.get("ownerColor") ?? undefined,
      timeControl: searchParams?.get("timeControl") ?? undefined,
    },
    {
      pollingInterval: 5000,
    }
  );
  const { handleApiError } = useHandleApiError();

  const t = useTranslations("SearchGame");
  if (isLoading) {
    return (
      <div className={cl.root}>
        <AppLoader />
      </div>
    );
  }

  if (isError) {
    handleApiError(error, (message) => {
      toast.error(message, getErrorToastConfig());
    });

    //TODO: make a component for that
    return <div>something went wrong...</div>;
  }

  if (isSuccess) {
    return (
      <div className={cl.root}>
        {games.length > 0 ? (
          <ul className={cl.list}>
            <div className={cl.listHeader}>
              <AppText weight="600" color="text-400">
                User
              </AppText>
              <AppText weight="600">Time control</AppText>
              <AppText weight="500">Color</AppText>
            </div>
            {games.map((game) => (
              <PendingGamesListItem game={game} key={game.id} />
            ))}
          </ul>
        ) : (
          <div className={cl.empty}>
            <AppText tag="h3">{t("noGamesFound")}</AppText>
          </div>
        )}
      </div>
    );
  }
};
