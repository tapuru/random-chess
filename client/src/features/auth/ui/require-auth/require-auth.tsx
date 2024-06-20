"use client";

import { selectIsAuth } from "@/entities/auth";
import { useRouter } from "@/shared/config/navigation";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import React, { useEffect } from "react";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  if (isAuth) {
    return <>{children}</>;
  }

  return null;
};
