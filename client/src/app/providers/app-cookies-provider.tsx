"use client";

import { CookiesProvider } from "react-cookie";

export const AppCookiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};
