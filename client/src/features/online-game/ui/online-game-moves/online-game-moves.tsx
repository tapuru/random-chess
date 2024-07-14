import { GameMoves, gameApi } from "@/entities/game";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";

export const OnlineGameMoves = () => {
  const params = useParams<{ gameId: string }>();

  const { data: game, isLoading } = gameApi.useGetGameQuery(
    params?.gameId || skipToken
  );
  if (isLoading) return <AppLoader />;
  if (!game) return null;
  return <GameMoves moves={game.moves} />;
};
