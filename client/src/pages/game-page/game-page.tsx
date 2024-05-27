"use client";

import cl from "./game-page.module.scss";
import { Container } from "@/shared/ui/container/container";
import { ChessColors } from "@/shared/types/chess-colors";
import {
  Player,
  playersActions,
  selectEnemy,
  selectPlayer,
} from "@/entities/player";
import { GameBoard } from "@/widgets/game-board";
import { PlayerInfo } from "@/widgets/player-info";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { useEffect } from "react";
import { GameInfo } from "@/widgets/game-info";
import { GameResult } from "@/widgets/game-result";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";

const player1: Player = {
  color: ChessColors.WHITE,
  isWinner: false,
  loses: 0,
  timeLeft: 300,
  type: "basic",
  wins: 0,
};

const player2: Player = {
  color: ChessColors.BLACK,
  isWinner: false,
  loses: 0,
  timeLeft: 300,
  type: "basic",
  wins: 0,
};

export const GamePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(playersActions.setEnemy(player2));
    dispatch(playersActions.setPlayer(player1));
  }, []);
  const player = useAppSelector(selectPlayer);
  const enemy = useAppSelector(selectEnemy);

  return (
    <Container>
      <main className={cl.root}>
        <div className={cl.content}>
          <div className={cl.board}>
            <GameBoard />
          </div>
          <div className={cl.gameInfo}>
            <PlayerInfo player={enemy} />
            <GameInfo />
            <PlayerInfo player={player} />
          </div>
        </div>
      </main>
      <GameResult />
    </Container>
  );
};
