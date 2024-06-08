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
import { LocalResignButton } from "@/features/local-game";

export const GamePage = () => {
  const dispatch = useAppDispatch();

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
              gameActions={
                <div>
                  <LocalResignButton />
                </div>
              }
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
