"use client";

import { gameApi } from "@/entities/game";
import cl from "./online-game-resign-button.module.scss";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { FaRegFlag } from "react-icons/fa6";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectUser } from "@/entities/auth";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { IoFlagSharp } from "react-icons/io5";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { toast } from "react-toastify";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";

export const OnlineGameResignButton = () => {
  const [resign, { isLoading }] = gameApi.useResignMutation();
  const params = useParams<{ gameId: string }>();
  const { data: game } = gameApi.useGetGameQuery(params?.gameId || skipToken);
  const user = useAppSelector(selectUser);
  const { handleApiError } = useHandleApiError();
  if (!user || !game) return null;

  const handleClick = async () => {
    try {
      await resign({ gameId: game.id, userId: user.id }).unwrap();
    } catch (error) {
      handleApiError(error, (message: string) => {
        toast.error(message, getErrorToastConfig());
      });
    }
  };

  return (
    <AppButton
      className={cl.root}
      icon={<IoFlagSharp color="#ffffff" />}
      size="sm"
      variant="filled"
      color="secondary"
      onClick={handleClick}
      disabled={isLoading}
    />
  );
};
