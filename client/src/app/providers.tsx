"use client";

import { ReduxProvider } from "./store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};
