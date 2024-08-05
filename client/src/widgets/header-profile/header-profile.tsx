"use client";

import { profileApi } from "../../entities/profile/api/profileApi";
import cl from "./header-profile.module.scss";
import React from "react";
import { AppAvatar } from "@/shared/ui/app-avatar/app-avatar";
import { AppText } from "@/shared/ui/app-text/app-text";
import { AppDropdownMenu } from "@/shared/ui/app-dropdown-menu/app-dropdown-menu";
import { Link } from "@/shared/config/navigation";
import { LoginButton, LogoutButton } from "@/features/auth";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectIsAuth } from "@/entities/auth";

export const HeaderProfile = () => {
  const isAuth = useAppSelector(selectIsAuth);

  const {
    data: me,
    isLoading,
    isError,
    error,
    isSuccess,
  } = profileApi.useGetMeQuery();

  console.log(me);

  if (!isAuth) {
    return <LoginButton />;
  }
  if (isError) {
    console.log(error);
    return null;
  }

  if (isLoading) {
    return (
      <div className={cl.root}>
        <div className={cl.avatar}>
          <AppAvatar alt="loading avatar" />
        </div>
      </div>
    );
  }

  if (isSuccess)
    return (
      <AppDropdownMenu
        trigger={
          <div className={cl.root}>
            <div className={cl.avatar}>
              <AppAvatar alt={me.username} src={me.photo} />
            </div>
            <AppText>{me.username}</AppText>
          </div>
        }
        label={me.username}
        contentClassName={cl.menuContent}
      >
        <AppDropdownMenu.Item>
          <Link className={cl.link} href={`/profile/${me.id}`}>
            Profile
          </Link>
        </AppDropdownMenu.Item>
        <AppDropdownMenu.Item>
          <Link href={`/settings`} className={cl.link}>
            Settings
          </Link>
        </AppDropdownMenu.Item>
        <AppDropdownMenu.Separator />
        <AppDropdownMenu.Item>
          <LogoutButton />
        </AppDropdownMenu.Item>
      </AppDropdownMenu>
    );
};
