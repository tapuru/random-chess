"use client";

import { gameApi } from "@/entities/game";
import cl from "./online-game-resign-button.module.scss";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { FaRegFlag } from "react-icons/fa6";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectUser } from "@/entities/auth";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";

export const OnlineGameResignButton = () => {
  const [resign, { isLoading }] = gameApi.useResignMutation();
  const params = useParams<{ gameId: string }>();
  const { data: game } = gameApi.useGetGameQuery(params?.gameId || skipToken);
  const user = useAppSelector(selectUser);
  if (!user || !game) return null;

  const handleClick = () => {
    try {
      resign({ gameId: game.id, userId: user.id });
    } catch (error) {
      //TODO: handle error
      console.log(error);
    }
  };

  return (
    <AppButton
      className={cl.root}
      icon={<FaRegFlag />}
      size="sm"
      variant="filled"
      color="secondary"
      onClick={handleClick}
      disabled={isLoading}
    />
  );
};
