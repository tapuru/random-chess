import cl from "./lobby-page-layout.module.scss";

interface LobbyPageLayoutProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
}

export const LobbyPageLayout = ({
  sidebar,
  header,
  content,
}: LobbyPageLayoutProps) => {
  return (
    <div className={cl.root}>
      <aside className={cl.sidebar}>{sidebar}</aside>
      <main className={cl.main}>
        {header}
        {content}
      </main>
    </div>
  );
};
