import cl from "./game-search-result-layout.module.scss";

export const GameSearchResultLayout = ({
  filtersButton,
  list,
  quickGameButton,
}: {
  quickGameButton: React.ReactNode;
  filtersButton: React.ReactNode;
  list: React.ReactNode;
}) => {
  return (
    <div className={cl.root}>
      <div className={cl.header}>
        {quickGameButton}
        {filtersButton}
      </div>
      <div className={cl.list}>{list}</div>
    </div>
  );
};
