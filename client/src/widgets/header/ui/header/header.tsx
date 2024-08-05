import React from "react";
import { HeaderLeft } from "../header-left/header-left";
import { HeaderRight } from "../header-right/header-right";
import cl from "./header.module.scss";

export const Header = ({ profile }: { profile: React.ReactNode }) => {
  return (
    <header className={cl.root}>
      <div className={cl.left}>
        <HeaderLeft />
      </div>
      <div className={cl.right}>
        <HeaderRight profile={profile} />
      </div>
    </header>
  );
};
