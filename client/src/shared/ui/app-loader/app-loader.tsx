import cl from "./app-loader.module.scss";
import { AppLoaderSvg } from "./app-loader-svg";
import cn from "classnames";

interface AppLoaderProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
}

export const AppLoader = ({
  size = "md",
  fullscreen = false,
  color = "primary",
}: AppLoaderProps) => {
  return (
    <div
      className={cn(
        cl.root,
        {
          [cl.sm]: size === "sm",
          [cl.md]: size === "md",
          [cl.lg]: size === "lg",
        },
        {
          [cl.fullscreen]: fullscreen,
        },
        {
          [cl.primary]: color === "primary",
          [cl.secondary]: color === "secondary",
        }
      )}
    >
      <AppLoaderSvg />
    </div>
  );
};
