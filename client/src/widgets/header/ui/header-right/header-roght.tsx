import { LanguageSelect } from "@/features/internationalization";
import cl from "./header-right.module.scss";

export const HeaderRight = () => {
  return (
    <div className={cl.root}>
      <LanguageSelect />
    </div>
  );
};
