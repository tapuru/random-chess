import React from "react";
import cl from "./app-form.module.scss";
import * as Form from "@radix-ui/react-form";

interface AppFormProps extends Form.FormProps {}
interface FormMessage
  extends Pick<Form.FormMessageProps, "match" | "forceMatch" | "name"> {
  message?: string;
}
interface FormFieldProps
  extends Pick<Form.FormFieldProps, "name" | "children"> {
  label?: string;
  messages?: FormMessage[];
  className?: string;
}

export const AppForm = ({ children, ...props }: AppFormProps) => {
  return (
    <Form.Root {...props} className={cl.root}>
      {children}
    </Form.Root>
  );
};

AppForm.Field = ({ children, label, messages, ...props }: FormFieldProps) => {
  return (
    <Form.Field {...props} className={cl.filed}>
      <Form.Label className={cl.label}>{label}</Form.Label>
      {children}
      {messages?.map((m, index) => (
        <Form.Message
          className={cl.message}
          match={m.match}
          forceMatch={m.forceMatch}
          key={index}
        >
          {m.message}
        </Form.Message>
      ))}
    </Form.Field>
  );
};

AppForm.Control = ({ children }: { children: React.ReactNode }) => {
  return (
    <Form.FormControl className={cl.control} asChild>
      {children}
    </Form.FormControl>
  );
};

AppForm.Submit = ({ children }: { children: React.ReactNode }) => {
  return <Form.Submit asChild>{children}</Form.Submit>;
};
