import { gameApi } from "@/entities/game";
import { profileApi } from "@/entities/profile";
import { ChessColors } from "@/shared/types/chess-colors";
import { skipToken } from "@reduxjs/toolkit/query";
import { Chess, Move } from "chess.js";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    const newChess = new Chess(game?.currentFen);
    setChess(newChess);
  }, [game]);

  function start() {
    const chess = new Chess(game?.initialFen);
    setChess(chess);
  }

  const handleBoardChange = useCallback(
    (move: Move, chess: Chess) => {
      if (!game) return;
      makeMove({ ...move, gameId: game.id })
        .unwrap()
        .catch((e) => console.log(e));
    },
    [chess, game]
  );

  const disableBoard = game?.currentTurn !== frendlyPlayerColor;

  return { disableBoard, handleBoardChange, isLoading, chess, setChess };
};
