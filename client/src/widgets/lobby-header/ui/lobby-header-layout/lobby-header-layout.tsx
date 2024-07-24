import React from "react";
import cl from "./lobby-header-layout.module.scss";
import { AppText } from "@/shared/ui/app-text/app-text";

export const LobbyHeaderLayout = ({
  action,
  title,
}: {
  title: string;
  action: React.ReactNode;
}) => {
  return (
    <header className={cl.root}>
      <div className={cl.title}>
        <AppText tag="h1">{title}</AppText>
      </div>
      <div className={cl.actions}>
        {action}
      </div>
    </header>
  );
};
