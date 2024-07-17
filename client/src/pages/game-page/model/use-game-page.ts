import { selectUser } from "@/entities/auth";
import { gameApi } from "@/entities/game";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useGamePage = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading: isGameLoading } = gameApi.useGetGameQuery(
    params?.gameId ?? skipToken
  );
  const { data: rematchData } = gameApi.useGetRematchDataQuery(
    params?.gameId ?? skipToken
  );
  const [cancelRematch] = gameApi.useCancelRematchMutation();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    return () => {
      if (params?.gameId && user) {
        console.log("here");
        cancelRematch({ gameId: params.gameId, userId: user.id });
      }
    };
  }, []);

  return { game, isGameLoading };
};
