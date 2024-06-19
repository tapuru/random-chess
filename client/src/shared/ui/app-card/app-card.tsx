import React from "react";
import cl from "./app-card.module.scss";
import cn from "classnames";

interface AppCardProps {
  children?: React.ReactNode;
  variant?: "floating" | "basic";
  className?: string;
}

export const AppCard = ({
  children,
  className,
  variant = "basic",
}: AppCardProps) => {
  return (
    <div
      className={cn(
        cl.root,
        {
          [cl.basic]: variant === "basic",
          [cl.floating]: variant === "floating",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

AppCard.Content = ({ children }: { children?: React.ReactNode }) => {
  return <div className={cl.content}>{children}</div>;
};
