"use client";

import { getSocket, wsBaseApi } from "@/shared/api/ws-base-api";
import { apiErrorSchema } from "@/shared/lib/api-helpers";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "use-intl";

export const WsExceptionNotifier = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("ApiErrors");

  useEffect(() => {
    const socket = getSocket();
    socket.on("exception", (exception) => {
      if (exception) {
        let message: string;
        const result = apiErrorSchema.safeParse(exception.message);
        if (result.success) {
          message = t(result.data);
        } else {
          message = exception.message;
        }
        toast.error(message, getErrorToastConfig());
      }
    });
    return () => {
      socket.off("exception");
    };
  }, [t]);

  return children;
};
