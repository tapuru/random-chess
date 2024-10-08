import { gameApi } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { ChessColors } from "@/shared/types/chess-colors";
import { skipToken } from "@reduxjs/toolkit/query";
import { Chess, Move } from "chess.js";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useOnlineGameBoard = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading } = gameApi.useGetGameQuery(
    params?.gameId ?? skipToken
  );
  const [chess, setChess] = useState(new Chess());
  const { data: profile } = profileApi.useGetMeQuery();
  const [makeMove] = gameApi.useMakeMoveMutation();
  const frendlyPlayerColor: ChessColors =
    game?.playerBlack?.id === profile?.id
      ? ChessColors.BLACK
      : ChessColors.WHITE;
  const { handleApiError } = useHandleApiError();

  const start = useCallback(() => {
    const chess = new Chess(game?.initialFen);
    setChess(chess);
  }, [game?.initialFen]);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    console.log(game?.currentFen);
    const newChess = new Chess(game?.currentFen);
    setChess(newChess);
  }, [game]);

  const handleBoardChange = useCallback(
    (move: Move, chess: Chess) => {
      if (!game) return;
      makeMove({ ...move, gameId: game.id })
        .unwrap()
        .catch((e) => {
          handleApiError(e, (message) => {
            toast.error(message, getErrorToastConfig());
          });
        });
    },
    [game, handleApiError, makeMove]
  );

  const disableBoard = game?.currentTurn !== frendlyPlayerColor;

  return { disableBoard, handleBoardChange, isLoading, chess, setChess };
};
