"use client";

import { LanguageSelect } from "@/features/internationalization";
import cl from "./header-right.module.scss";
import { LoginButton, LogoutButton } from "@/features/auth";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectIsAuth } from "@/entities/auth";

export const HeaderRight = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <div className={cl.root}>
      <LanguageSelect />

      {isAuth ? (
        <div className={cl.profilePlaceholder}>
          <div className={cl.avatarPlaceholder}></div>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};
