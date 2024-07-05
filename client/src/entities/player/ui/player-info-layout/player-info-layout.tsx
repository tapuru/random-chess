import React from "react";
import cl from "./player-info-layout.module.scss";

interface PlayerInfoLayoutProps {
  profile: React.ReactNode;
  timer?: React.ReactNode;
}

export const PlayerInfoLayout = ({ profile, timer }: PlayerInfoLayoutProps) => {
  return (
    <div className={cl.root}>
      <div className={cl.profile}>{profile}</div>
      {timer && <div className={cl.timer}>{timer}</div>}
    </div>
  );
};
