import React from "react";
import cl from "./container.module.scss";
import cn from "classnames";

interface ContainerProps {
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Container = ({ fullWidth, children }: ContainerProps) => {
  return (
    <div
      className={cn({
        [cl.root]: !fullWidth,
        [cl.fullWidth]: fullWidth,
      })}
    >
      {children}
    </div>
  );
};
