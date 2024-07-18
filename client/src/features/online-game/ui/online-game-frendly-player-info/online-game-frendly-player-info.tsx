"use client";

import { PlayerInfoLayout, PlayerTimer } from "@/entities/player";
import { IngameProfileLayout, profileApi } from "@/entities/profile";
import { useRouter } from "@/shared/config/navigation";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { toast } from "react-toastify";

export const OnlineGameFrendlyPlayerInfo = () => {
  const {
    data: me,
    isLoading,
    isError,
    error,
    isSuccess,
  } = profileApi.useGetMeQuery();
  const { handleApiError } = useHandleApiError();
  const router = useRouter();
  if (isError) {
    handleApiError(error, (message) => {
      toast.error(message, getErrorToastConfig());
      router.push("/login");
    });
  }

  if (isLoading) return <AppLoader />;

  if (isSuccess)
    return (
      <PlayerInfoLayout
        profile={<IngameProfileLayout profile={me} />}
        timer={<div>timer</div>}
      />
    );
};
