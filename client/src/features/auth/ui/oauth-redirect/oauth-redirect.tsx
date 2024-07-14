"use client";

import { authActions } from "@/entities/auth";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const OAuthRedirect = () => {
  const dispath = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams?.get("token");
  const userString = searchParams?.get("user");

  useEffect(() => {
    if (userString && accessToken) {
      const user = JSON.parse(userString);

      dispath(
        authActions.setCredentials({
          user,
          accessToken,
        })
      );
      router.push("/");
    }
  }, []);

  if (!accessToken || !userString) router.push("/");

  return <AppLoader fullscreen />;
};
