"use client";

import { AppModal } from "@/shared/ui/app-modal/app-modal";
import cl from "../game-result.module.scss";
import cn from "classnames";
import { useOnlineGameResult } from "../../model/use-online-game-result";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { useTranslations } from "use-intl";
import { LeaveGameButton } from "@/entities/game";
import { OnlineGameOfferRematchButton } from "@/features/online-game";

export const OnlineGameResult = () => {
  const result = useOnlineGameResult();
  const t = useTranslations("Game");
  if (!result) return null;
  const { open, reason, setOpen, title, titleColor } = result;

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
          <OnlineGameOfferRematchButton onOfferRematch={() => setOpen(false)} />
          <LeaveGameButton title={t("leave")} />
        </div>
      </div>
    </AppModal>
  );
};
