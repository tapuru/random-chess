"use client";
import { wsBaseApi } from "@/shared/api/ws-base-api";

export const ConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  wsBaseApi.useInitConnectionQuery();
  return children;
};
