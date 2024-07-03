import { GameMoves, gameApi } from "@/entities/game";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";

export const OnlineGameMoves = () => {
  const params = useParams<{ gameId: string }>();

  const { data: game, isLoading } = gameApi.useGetGameQuery(
    params?.gameId || skipToken
  );
  //TODO: make loader
  if (isLoading) return <div>Loading...</div>;
  if (!game) return null;
  return <GameMoves moves={game.moves} />;
};
