"use client";

import cn from "classnames";
import cl from "../game-result.module.scss";
import { AppModal } from "@/shared/ui/app-modal/app-modal";
import { useGameResult } from "../../model/use-game-result";
import { LocalAbortButton, LocalRematchButton } from "@/features/local-game";

export const LocalGameResult = () => {
  const {
    open,
    setOpen,
    reason,
    title,
    playerOne,
    gameResult,
    playerTwo,
    titleColor,
    t,
  } = useGameResult();
  if (!gameResult || !playerOne || !playerTwo) return null;

  return (
    <AppModal open={open} onOpenChange={() => setOpen(false)}>
      <div className={cl.content}>
        <div
          className={cn(cl.title, {
            [cl.winner]: titleColor === "s",
            [cl.looser]: titleColor === "e",
          })}
        >
          {title}
        </div>
        {!!reason && <div className={cl.reason}>{t(reason)}</div>}
        <div className={cl.actions}>
          <LocalRematchButton title={t("rematch")} />
          <LocalAbortButton title={t("leave")} />
        </div>
      </div>
    </AppModal>
  );
};
