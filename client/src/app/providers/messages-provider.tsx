import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";

export const MessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
