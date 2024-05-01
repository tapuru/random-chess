import { HeaderRight } from "../header-right/header-right";
import cl from "./header.module.scss";

export const Header = () => {
  return (
    <div className={cl.root}>
      <div className={cl.right}>
        <HeaderRight />
      </div>
      <div className={cl.left}>
        <div></div>
      </div>
    </div>
  );
};
