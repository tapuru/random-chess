import React, { ReactElement } from "react";
import cl from "./app-form.module.scss";
import cn from "classnames";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  UseFormStateReturn,
} from "react-hook-form";

interface AppFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}
interface AppFormFieldProps {
  name: string;
  isError?: boolean;
  errorMessages?: string[];
  label?: string;
  labelPosition?: "top" | "left" | "right" | "bottom";
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface AppFormRHFFieldProps<T extends FieldValues>
  extends Omit<AppFormFieldProps, "name" | "children"> {
  name: FieldPath<T>;
  control?: Control<T>;
  rules?: Record<string, unknown>;
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => ReactElement<any>;
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
  errorMessages = ["invalid data"],
  isError,
  label,
  labelPosition = "top",
  required,
  className,
  children,
}: AppFormFieldProps) => {
  return (
    <div
      className={cn(
        cl.field,
        {
          [cl.required]: required,
          [cl.error]: isError,
        },
        className
      )}
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
      {isError &&
        errorMessages.map((message, index) => (
          <div className={cl.errorMessage} key={index}>
            {message}
          </div>
        ))}
    </div>
  );
};

AppForm.RHFField = <T extends FieldValues>({
  name,
  errorMessages = ["invalid data"],
  isError,
  label,
  labelPosition = "top",
  required,
  render,
  className,
  control,
}: AppFormRHFFieldProps<T>) => {
  return (
    <AppForm.Field
      name={name}
      errorMessages={errorMessages}
      isError={isError}
      label={label}
      labelPosition={labelPosition}
      required={required}
      className={className}
    >
      <Controller name={name} control={control} render={render} />
    </AppForm.Field>
  );
};
