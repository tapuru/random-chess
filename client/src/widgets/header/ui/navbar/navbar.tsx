"use client";

import NavLink from "@/shared/ui/nav-link/nav-link";
import cl from "./navbar.module.scss";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const t = useTranslations("Navigation");

  return (
    <nav className={cl.navigation}>
      <ul className={cl.navList}>
        <li className={cl.navItem}>
          <NavLink title={t("lobby")} href="/lobby" />
        </li>
        <li className={cl.navItem}>
          <NavLink title={t("history")} href="/history" />
        </li>
        <li className={cl.navItem}>
          <NavLink title={t("about")} href="/about" />
        </li>
      </ul>
    </nav>
  );
};
