import cl from "./lobby-page-layout.module.scss";

interface LobbyPageLayoutProps {
  sidebar: React.ReactNode;
}

export const LobbyPageLayout = ({ sidebar }: LobbyPageLayoutProps) => {
  return (
    <div className={cl.root}>
      <aside className={cl.sidebar}>{sidebar}</aside>
      <main className={cl.main}>main</main>
    </div>
  );
};
