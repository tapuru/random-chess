import { HeaderLeft } from "../header-left/header-left";
import { HeaderRight } from "../header-right/header-roght";
import cl from "./header.module.scss";

export const Header = () => {
  return (
    <header className={cl.root}>
      <div className={cl.left}>
        <HeaderLeft />
      </div>
      <div className={cl.right}>
        <HeaderRight />
      </div>
    </header>
  );
};
