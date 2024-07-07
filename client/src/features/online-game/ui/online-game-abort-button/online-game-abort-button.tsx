"use client";

import { selectUser } from "@/entities/auth";
import { gameApi } from "@/entities/game";
import { useRouter } from "@/shared/config/navigation";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";

export const OnlineGameAbortButton = ({ title }: { title: string }) => {
  const params = useParams<{ gameId: string }>();
  const { data: game } = gameApi.useGetGameQuery(params?.gameId || skipToken);
  const [abortGame, { isLoading }] = gameApi.useAbortMutation();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  if (!game || !user) {
    return null;
  }

  const handleClick = async () => {
    try {
      const message = await abortGame({
        userId: user?.id,
        gameId: game.id,
      }).unwrap();
      router.push("/");
      console.log(message);
    } catch (error) {
      //TODO: handle error
      console.log(error);
    }
  };

  return (
    <AppButton
      variant="filled"
      color="primary"
      disabled={isLoading}
      onClick={handleClick}
    >
      {title}
    </AppButton>
  );
};
