"use client";

import { Container } from "@/shared/ui/container/container";
import { GameBoard } from "@/widgets/game-board";
import { GameResult } from "@/widgets/game-result";
import { GameInfoLayout } from "@/entities/game";
import { GameTurn } from "@/widgets/game-turn";
import { GamePageLayout } from "../game-page-layout/game-page-layout";
import { GameStatus } from "@/shared/types/game-status";
import { PendingGameScreen } from "@/widgets/pending-game-screen";
import { GameMovesFactory } from "@/widgets/game-moves-factory";
import { PlayerInfo } from "@/widgets/player-info";
import { GameActions } from "@/widgets/game-actions";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { useGamePage } from "../../model/use-game-page";

export const GamePage = () => {
  const { game, isGameLoading } = useGamePage();

  if (!game) return <div>game not found</div>;
  if (game.status === GameStatus.PENDING) {
    return <PendingGameScreen game={game} />;
  }

  return (
    <Container>
      {isGameLoading ? (
        <AppLoader fullscreen />
      ) : (
        <>
          <GamePageLayout
            board={<GameBoard gameType={game.settings.type} />}
            gameInfo={
              <GameInfoLayout
                gameActions={<GameActions gameType={game.settings.type} />}
                gameMoves={<GameMovesFactory gameType={game.settings.type} />}
                gameTurn={<GameTurn gameType={game.settings.type} />}
              />
            }
            enemyPlayerInfo={
              <PlayerInfo gameType={game.settings.type} side="enemy" />
            }
            frendlyPlayerInfo={
              <PlayerInfo gameType={game.settings.type} side="frendly" />
            }
          />
          <GameResult gameType={game.settings.type} />
        </>
      )}
    </Container>
  );
};
