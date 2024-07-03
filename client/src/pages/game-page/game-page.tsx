"use client";

import { Container } from "@/shared/ui/container/container";
import { GameBoard } from "@/widgets/game-board";
import { PlayerOneInfo, PlayerTwoInfo } from "@/widgets/player-info";
import { GameResult } from "@/widgets/game-result";
import { GameInfoLayout, GameMoves, gameApi } from "@/entities/game";
import { GameTurn } from "@/widgets/game-turn";
import { LocalAbortButton, LocalResignButton } from "@/features/local-game";
import { GamePageLayout } from "./ui/game-page-layout";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";

export const GamePage = () => {
  const params = useParams<{ gameId: string }>();
  const { data: game } = gameApi.useGetGameQuery(params?.gameId ?? skipToken);

  if (!game) return <div>game not found</div>;

  return (
    <Container>
      <GamePageLayout
        board={<GameBoard gameType={game.settings.type} />}
        gameInfo={
          <GameInfoLayout
            gameActions={
              <>
                <LocalResignButton />
                <LocalAbortButton />
              </>
            }
            gameMoves={<GameMoves />}
            gameTurn={<GameTurn />}
          />
        }
        playerOneInfo={<PlayerOneInfo />}
        playerTwoInfo={<PlayerTwoInfo />}
      />
      <GameResult />
    </Container>
  );
};
