"use client";

import cn from "classnames";
import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { Link } from "../../config/navigation";
import cl from "./nav-link.module.scss";

export default function NavLink({
  href,
  title,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href}
      className={cn(cl.navLink, {
        [cl.active]: isActive,
      })}
      {...rest}
    >
      {title}
    </Link>
  );
}
