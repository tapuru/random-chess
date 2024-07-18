import { AppText } from "@/shared/ui/app-text/app-text";
import { ProfileDto } from "../../types/profile-dto";
import cl from "./in-game-profile-layout.module.scss";
import React from "react";
import { AppAvatar } from "@/shared/ui/app-avatar/app-avatar";

export const IngameProfileLayout = ({ profile }: { profile: ProfileDto }) => {
  return (
    <div className={cl.root}>
      <div className={cl.avatar}>
        <AppAvatar src={profile.photo} alt={profile.username} />
      </div>
      <div className={cl.name}>
        <AppText tag="p" weight="500">
          {profile.username}
        </AppText>
      </div>
    </div>
  );
};
