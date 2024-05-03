import Link from "next/link";
import cl from "./header-left.module.scss";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";
import { Navbar } from "../navbar/navbar";

export const HeaderLeft = () => {
  const messages = useMessages();

  return (
    <div className={cl.root}>
      <div className={cl.logo}>
        <Link href={"/"}>LOGO</Link>
      </div>
      <NextIntlClientProvider messages={pick(messages, "Navigation")}>
        <Navbar />
      </NextIntlClientProvider>
    </div>
  );
};
