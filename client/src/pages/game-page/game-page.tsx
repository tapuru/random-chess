"use client";

import cl from "./game-page.module.scss";
import { Container } from "@/shared/ui/container/container";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameBoard } from "@/widgets/game-board";
import { PlayerOneInfo, PlayerTwoInfo } from "@/widgets/player-info";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { useEffect } from "react";
import { GameResult } from "@/widgets/game-result";
import { Player, playersActions } from "@/entities/player";
import { GameInfoLayout, GameMoves } from "@/entities/game";
import { GameTurn } from "@/widgets/game-turn";

const player1: Player = {
  color: ChessColors.WHITE,
  isWinner: false,
  loses: 0,
  timeLeft: 10,
  type: "basic",
  wins: 0,
};

const player2: Player = {
  color: ChessColors.BLACK,
  isWinner: false,
  loses: 0,
  timeLeft: 10,
  type: "basic",
  wins: 0,
};

export const GamePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(playersActions.setPlayerTwo(player2));
    dispatch(playersActions.setPlayerOne(player1));
  }, []);

  return (
    <Container>
      <main className={cl.root}>
        <div className={cl.content}>
          <div className={cl.board}>
            <GameBoard />
          </div>
          <div className={cl.info}>
            <PlayerTwoInfo />
            <GameInfoLayout
              gameActions={<div></div>}
              gameMoves={<GameMoves />}
              gameTurn={<GameTurn />}
            />
            <PlayerOneInfo />
          </div>
        </div>
      </main>
      <GameResult />
    </Container>
  );
};
