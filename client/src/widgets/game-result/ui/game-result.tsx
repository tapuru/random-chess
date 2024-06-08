"use client";

import cn from "classnames";
import cl from "./game-result.module.scss";
import { AppModal } from "@/shared/ui/app-modal/app-modal";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useGameResult } from "../model/use-game-result";
import { useRouter } from "@/shared/config/navigation";
import { LocalRematchButton } from "@/features/local-game";

export const GameResult = () => {
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
  const router = useRouter();
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
          <AppButton onClick={() => router.push("/lobby")}>
            {t("leave")}
          </AppButton>
        </div>
      </div>
    </AppModal>
  );
};
