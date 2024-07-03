"use client";

import { selectUser } from "@/entities/auth";
import { gameApi } from "@/entities/game";
import { GameDto } from "@/entities/game/types/game-dto";
import { profileApi } from "@/entities/profile";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { AppText } from "@/shared/ui/app-text/app-text";
import { Container } from "@/shared/ui/container/container";
import { useEffect } from "react";

export const PendingGameScreen = ({ game }: { game: GameDto }) => {
  const { data: me, isLoading } = profileApi.useGetMeQuery();
  const [joinGame] = gameApi.useJoinGameMutation();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (
      game.playerBlack?.id !== me?.id &&
      game.playerWhite?.id !== me?.id &&
      user
    ) {
      joinGame({ gameId: game.id, userId: user?.id })
        .unwrap()
        .then((joinedGame) => {
          console.log("JOIN SUCCESS", joinedGame);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [joinGame, me, game]);

  return (
    <Container>
      <main>
        <AppCard>
          <AppCard.Content>
            <AppText tag="h2">Game: {game.id}</AppText>
            <AppText>Status: Pending</AppText>
            <AppText>Link: {`http://localhost:3000/game/${game.id}`}</AppText>
          </AppCard.Content>
        </AppCard>
      </main>
    </Container>
  );
};
