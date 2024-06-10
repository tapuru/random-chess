"use client";

import { gameActions, selectGame } from "@/entities/game";
import { playersActions } from "@/entities/player";
import { useRouter } from "@/shared/config/navigation";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { AppButton } from "@/shared/ui/app-button/app-button";
import cl from "./local-abort-button.module.scss";
import { GrClose } from "react-icons/gr";
export const LocalAbortButton = ({ title }: { title?: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = () => {
    dispatch(gameActions.setGame(null));
    dispatch(playersActions.setPlayerOne(null));
    dispatch(playersActions.setPlayerTwo(null));
    dispatch(gameActions.setResult(null));
    router.push("/");
  };

  return (
    <AppButton
      size={title ? "md" : "sm"}
      className={cl.root}
      onClick={handleClick}
      variant="filled"
      color="primary"
      icon={title ? null : <GrClose />}
    >
      {title}
    </AppButton>
  );
};
