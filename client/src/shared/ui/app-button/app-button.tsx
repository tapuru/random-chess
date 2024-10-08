import cn from "classnames";
import React, { ComponentProps, PropsWithRef } from "react";
import cl from "./app-button.module.scss";

interface AppButtonProps extends ComponentProps<"button"> {
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outlined";
  color?: "primary" | "secondary" | "inherit" | "success" | "error";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  className?: string;
}

export const AppButton = ({
  size = "md",
  children,
  color = "primary",
  disabled,
  fullWidth,
  icon,
  variant = "filled",
  href,
  className,
  ...props
}: AppButtonProps) => {
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          cl.root,
          {
            [cl.small]: size === "sm",
            [cl.medium]: size === "md",
            [cl.large]: size === "lg",
          },
          {
            [cl.primary]: color === "primary",
            [cl.secondary]: color === "secondary",
            [cl.error]: color === "error",
            [cl.success]: color === "success",
          },
          {
            [cl.filled]: variant === "filled",
            [cl.outlined]: variant === "outlined",
          },
          {
            [cl.fullWidth]: fullWidth,
          },
          className
        )}
      >
        {icon && <div className={cl.icon}>{icon}</div>}
        {children}
      </a>
    );
  }

  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        cl.root,
        {
          [cl.small]: size === "sm",
          [cl.medium]: size === "md",
          [cl.large]: size === "lg",
        },
        {
          [cl.primary]: color === "primary",
          [cl.secondary]: color === "secondary",
          [cl.error]: color === "error",
          [cl.success]: color === "success",
        },
        {
          [cl.filled]: variant === "filled",
          [cl.outlined]: variant === "outlined",
        },
        {
          [cl.fullWidth]: fullWidth,
        },
        className
      )}
    >
      {icon && <div className={cl.icon}>{icon}</div>}
      {children}
    </button>
  );
};
