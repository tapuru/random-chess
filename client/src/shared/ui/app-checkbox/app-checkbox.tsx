import React, { useId } from "react";
import cl from "./app-checkbox.module.scss";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa6";
import cn from "classnames";

interface AppCheckboxProps extends Checkbox.CheckboxProps {
  label?: string;
  color?: "primary" | "secondary";
}

export const AppCheckbox = React.forwardRef<HTMLDivElement, AppCheckboxProps>(
  ({ label, color = "secondary", ...props }, ref) => {
    const id = useId();

    return (
      <div
        className={cn(cl.root, {
          [cl.primary]: color === "primary",
          [cl.secondary]: color === "secondary",
        })}
        ref={ref}
      >
        <Checkbox.Root
          className={cl.checkboxRoot}
          defaultChecked
          id={id}
          {...props}
        >
          <Checkbox.Indicator className={cl.indicator}>
            <FaCheck />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          className={cn(cl.label, { [cl.disabled]: props.disabled })}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  }
);
