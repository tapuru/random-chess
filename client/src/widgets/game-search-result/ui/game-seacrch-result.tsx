import { AppCard } from "@/shared/ui/app-card/app-card";
import { GameSearchResultLayout } from "./game-search-result-layout/game-search-result-layout";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { PendingGamesList } from "@/features/search-game";
import { IoMdOptions } from "react-icons/io";

export const GameSearchResult = () => {
  return (
    <AppCard>
      <AppCard.Content>
        <GameSearchResultLayout
          filtersButton={<IoMdOptions size={24} />}
          list={<PendingGamesList />}
          quickGameButton={<AppButton color="secondary">Quick game</AppButton>}
        />
      </AppCard.Content>
    </AppCard>
  );
};
