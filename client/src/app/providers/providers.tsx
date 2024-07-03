import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReduxProvider } from "../store";
import { ConnectionProvider } from "./connection-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ReduxProvider>
        <ConnectionProvider>{children}</ConnectionProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
};
