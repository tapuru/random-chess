import { AppCard } from "@/shared/ui/app-card/app-card";
import cl from "./pending-game-screen-layout.module.scss";

interface PendingGameScreenLayoutProps {
  content: React.ReactNode;
  actions: React.ReactNode;
}

export const PendingGameScreenLayout = ({
  actions,
  content,
}: PendingGameScreenLayoutProps) => {
  return (
    <main className={cl.root}>
      <AppCard>
        <AppCard.Content className={cl.content}>
          {content}
          <div className={cl.actions}>{actions}</div>
        </AppCard.Content>
      </AppCard>
    </main>
  );
};
