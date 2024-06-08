import React from "react";
import cl from "./app-form.module.scss";
import cn from "classnames";

interface AppFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
interface AppFormFieldProps {
  isError?: boolean;
  errorMessage?: string;
  name: string;
  children?: React.ReactNode;
  label?: string;
  labelPosition?: "top" | "left" | "right" | "bottom";
  required?: boolean;
}
interface AppForm
  extends React.ForwardRefExoticComponent<
    AppFormProps & React.RefAttributes<HTMLFormElement>
  > {
  Field?: React.ForwardRefExoticComponent<
    AppFormFieldProps & React.RefAttributes<HTMLDivElement>
  >;
}

export const AppForm = ({ children, ...props }: AppFormProps) => {
  return (
    <form className={cl.root} {...props}>
      {children}
    </form>
  );
};

AppForm.Field = ({
  name,
  children,
  errorMessage = "error",
  isError,
  label,
  labelPosition = "top",
  required,
}: AppFormFieldProps) => {
  return (
    <div
      className={cn(cl.field, {
        [cl.required]: required,
        [cl.error]: isError,
      })}
    >
      <div
        className={cn(cl.fieldContent, {
          [cl.labelVertical]:
            labelPosition === "top" || labelPosition === "bottom",
          [cl.labelHorizontal]:
            labelPosition === "left" || labelPosition === "right",
        })}
      >
        {!!(label && (labelPosition === "top" || labelPosition === "left")) && (
          <label htmlFor={name}>{label}</label>
        )}
        {children}
        {!!(
          label &&
          (labelPosition === "right" || labelPosition === "bottom")
        ) && <label htmlFor={name}>{label}</label>}
      </div>
      {isError && <div className={cl.errorMessage}>{errorMessage}</div>}
    </div>
  );
};
