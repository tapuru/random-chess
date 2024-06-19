import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReduxProvider } from "./store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ReduxProvider>{children}</ReduxProvider>
    </NextIntlClientProvider>
  );
};
