import cl from "./game-actions-layout.module.scss";

export const GameActionsLayout = ({
  actions,
}: {
  actions: React.ReactNode;
}) => {
  return <div className={cl.root}>{actions}</div>;
};
