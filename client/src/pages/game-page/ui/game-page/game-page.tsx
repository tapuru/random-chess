"use client";

import { Container } from "@/shared/ui/container/container";
import { GameBoard } from "@/widgets/game-board";
import { GameResult } from "@/widgets/game-result";
import { GameInfoLayout, gameApi } from "@/entities/game";
import { GameTurn } from "@/widgets/game-turn";
import { LocalAbortButton, LocalResignButton } from "@/features/local-game";
import { GamePageLayout } from "../game-page-layout/game-page-layout";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { GameStatus } from "@/shared/types/game-status";
import { PendingGameScreen } from "@/widgets/pending-game-screen";
import { GameMovesFactory } from "@/widgets/game-moves-factory";
import { PlayerInfo } from "@/widgets/player-info";
import { GameActions } from "@/widgets/game-actions";

export const GamePage = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game, isLoading: isGameLoading } = gameApi.useGetGameQuery(
    params?.gameId ?? skipToken
  );

  if (!game) return <div>game not found</div>;
  if (game.status === GameStatus.PENDING) {
    return <PendingGameScreen game={game} />;
  }

  console.log(game);

  return (
    <Container>
      {isGameLoading ? (
        //TODO: add loader
        <div>loading...</div>
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
