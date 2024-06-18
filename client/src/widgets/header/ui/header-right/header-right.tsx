import { LanguageSelect } from "@/features/internationalization";
import cl from "./header-right.module.scss";
import { LoginButton } from "@/features/auth";

export const HeaderRight = () => {
  return (
    <div className={cl.root}>
      <LanguageSelect />
      <LoginButton />
    </div>
  );
};
