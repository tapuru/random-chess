"use client";

import { LanguageSelect } from "@/features/internationalization";
import cl from "./header-right.module.scss";
import React from "react";

export const HeaderRight = ({ profile }: { profile: React.ReactNode }) => {
  return (
    <div className={cl.root}>
      <LanguageSelect />
      {profile}
    </div>
  );
};
