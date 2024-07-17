"use client";

import { selectUser } from "@/entities/auth";
import { gameApi } from "@/entities/game";
import { GameDto } from "@/entities/game/types/game-dto";
import { profileApi } from "@/entities/profile";
import { OnlineGameAbortButton } from "@/features/online-game";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { AppText } from "@/shared/ui/app-text/app-text";
import { Container } from "@/shared/ui/container/container";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import cl from "./pending-game-screen.module.scss";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { useRouter } from "@/shared/config/navigation";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { toast } from "react-toastify";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";

export const PendingGameScreen = ({ game }: { game: GameDto }) => {
  const { data: me, isLoading } = profileApi.useGetMeQuery();
  const [joinGame] = gameApi.useJoinGameMutation();
  const user = useAppSelector(selectUser);
  const t = useTranslations("Game");
  const router = useRouter();
  const { handleApiError } = useHandleApiError();

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
          handleApiError(error, (message) => {
            toast.error(message, getErrorToastConfig());
          });
          router.push("/");
        });
    }
  }, [joinGame, me, game]);

  if (isLoading) return <AppLoader fullscreen />;

  return (
    <Container>
      <main className={cl.root}>
        <AppCard>
          <AppCard.Content className={cl.content}>
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

            <div className={cl.actions}>
              <OnlineGameAbortButton title={t("abortGame")} />
            </div>
          </AppCard.Content>
        </AppCard>
      </main>
    </Container>
  );
};
