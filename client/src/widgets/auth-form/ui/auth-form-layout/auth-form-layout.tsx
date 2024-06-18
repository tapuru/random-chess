import cl from "./auth-from-layout.module.scss";

export const AuthFormLayout = ({
  header,
  form,
  link,
}: {
  header: React.ReactNode;
  form: React.ReactNode;
  link: React.ReactNode;
}) => {
  return (
    <div className={cl.root}>
      <div className={cl.header}>{header}</div>
      <div className={cl.form}>{form}</div>
      <div className={cl.link}>{link}</div>
    </div>
  );
};
