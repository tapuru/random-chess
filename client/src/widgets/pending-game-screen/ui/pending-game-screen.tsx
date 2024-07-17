"use client";

import { GameDto } from "@/entities/game/types/game-dto";
import { OnlineGameAbortButton } from "@/features/online-game";
import { AppText } from "@/shared/ui/app-text/app-text";
import { Container } from "@/shared/ui/container/container";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { usePendingGameScreen } from "../model/use-pending-game-screen";
import { PendingGameScreenLayout } from "./pending-game-screen-layout/pending-game-screen-layout";

export const PendingGameScreen = ({ game }: { game: GameDto }) => {
  const { isLoading, t } = usePendingGameScreen(game);

  if (isLoading) return <AppLoader fullscreen />;

  return (
    <Container>
      <PendingGameScreenLayout
        content={
          <>
            <AppText align="center" tag="h1">
              {t("waitOpponent")}
            </AppText>
            <AppText>
              <AppLoader size="md" />
            </AppText>
            <AppText tag="span">
              {t("shareLink")}:{"  "}
              <AppText
                tag="span"
                color="secondary"
              >{`http://localhost:3000/game/${game.id}`}</AppText>
            </AppText>
          </>
        }
        actions={<OnlineGameAbortButton title={t("abortGame")} />}
      />
    </Container>
  );
};
