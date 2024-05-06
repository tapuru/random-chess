import { HomeBoard } from "../home-board/home-board";
import { HomeButtons } from "../home-buttons/home-buttons";
import cl from "./home-content.module.scss";

export const HomeContent = () => {
  return (
    <div className={cl.root}>
      <HomeBoard />
      <HomeButtons />
    </div>
  );
};
