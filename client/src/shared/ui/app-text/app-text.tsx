import React from "react";
import cl from "./app-text.module.scss";
import cn from "classnames";

interface AppTextProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span";
  align?: "left" | "center" | "right" | "inherit" | "justify";
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color?:
    | "text-50"
    | "text-100"
    | "text-200"
    | "text-300"
    | "text-400"
    | "text-500"
    | "text-600"
    | "text-700"
    | "text-800"
    | "text-900"
    | "primary"
    | "secondary";
  className?: string;
  children?: React.ReactNode;
}

export const AppText = ({
  tag = "p",
  align = "left",
  weight = "400",
  color = "text-500",
  className,
  children,
}: AppTextProps) => {
  const rootClassName = cn(
    cl.root,
    {
      [cl.alignCenter]: align === "center",
      [cl.alignLeft]: align === "left",
      [cl.alignRight]: align === "right",
      [cl.alignInherit]: align === "inherit",
      [cl.alignJustify]: align === "justify",
    },
    {
      [cl.weight100]: weight === "100",
      [cl.weight200]: weight === "200",
      [cl.weight300]: weight === "300",
      [cl.weight400]: weight === "400",
      [cl.weight500]: weight === "500",
      [cl.weight600]: weight === "600",
      [cl.weight700]: weight === "700",
      [cl.weight800]: weight === "800",
      [cl.weight900]: weight === "900",
    },
    {
      [cl.text50]: color === "text-50",
      [cl.text100]: color === "text-100",
      [cl.text200]: color === "text-200",
      [cl.text300]: color === "text-300",
      [cl.text400]: color === "text-400",
      [cl.text500]: color === "text-500",
      [cl.text600]: color === "text-600",
      [cl.text700]: color === "text-700",
      [cl.text800]: color === "text-800",
      [cl.text900]: color === "text-900",
      [cl.primary]: color === "primary",
      [cl.secondary]: color === "secondary",
    },
    {
      [cl.h1]: tag === "h1",
      [cl.h2]: tag === "h2",
      [cl.h3]: tag === "h3",
      [cl.h4]: tag === "h4",
      [cl.h5]: tag === "h5",
    },
    className
  );

  switch (tag) {
    case "p":
      return <p className={rootClassName}>{children}</p>;
    case "span":
      return <span className={rootClassName}>{children}</span>;
    case "h1":
      return <h1 className={rootClassName}>{children}</h1>;
    case "h2":
      return <h2 className={rootClassName}>{children}</h2>;
    case "h3":
      return <h3 className={rootClassName}>{children}</h3>;
    case "h4":
      return <h4 className={rootClassName}>{children}</h4>;
    case "h5":
      return <h5 className={rootClassName}>{children}</h5>;
    default:
      return <p className={rootClassName}>{children}</p>;
  }
};
