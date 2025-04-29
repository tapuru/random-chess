import cl from "./auth-page-layout.module.scss";

export const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={cl.root}>{children}</div>;
};
