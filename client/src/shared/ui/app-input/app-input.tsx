import React, { InputHTMLAttributes, PropsWithRef } from "react";
import cl from "./app-input.module.scss";
import cn from "classnames";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  isError?: boolean;
  small?: boolean;
  className?: string;
}

export const AppInput = React.forwardRef<HTMLDivElement, AppInputProps>(
  ({ name, label, isError, small, className, ...props }, ref) => {
    return (
      <div className={cn(cl.root, className)} ref={ref}>
        {label && (
          <label htmlFor={name} className={cl.label}>
            {label}
          </label>
        )}
        <input
          id={name}
          {...props}
          className={cn(cl.input, {
            [cl.error]: isError,
            [cl.small]: small,
            [cl.disabled]: props.disabled,
          })}
        />
      </div>
    );
  }
);
