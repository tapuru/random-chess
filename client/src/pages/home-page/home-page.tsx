import cl from "./home-page.module.scss";
import { HomeContent } from "@/widgets/home-content";

export const HomePage = () => {

  return (
    <main className={cl.root}>
        <HomeContent />
    </main>
  );
};
