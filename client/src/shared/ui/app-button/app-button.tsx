import React from "react";
import cl from "./app-button.module.scss";
import cn from "classnames";

interface AppButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outlined";
  color?: "primary" | "secondary" | "inherit" | "success" | "error";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
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
          }
        )}
      >
        {icon && <div className={cl.icon}>{icon}</div>}
        {children}
      </a>
    );
  }

  return (
    <button
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
        }
      )}
    >
      {icon && <div className={cl.icon}>{icon}</div>}
      {children}
    </button>
  );
};
