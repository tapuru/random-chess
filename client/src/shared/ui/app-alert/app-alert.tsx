import cl from "./app-alert.module.scss";
import cn from "classnames";

interface AppAlertProps {
  variant: "success" | "error" | "warning";
  children?: React.ReactNode;
  className?: string;
}

export const AppAlert = ({ variant, children, className }: AppAlertProps) => {
  return (
    <div
      className={cn(
        cl.root,
        {
          [cl.success]: variant === "success",
          [cl.error]: variant === "error",
          [cl.warning]: variant === "warning",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
