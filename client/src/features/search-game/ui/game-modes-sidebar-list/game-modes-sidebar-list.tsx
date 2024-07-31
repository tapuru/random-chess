import { GameModes } from "@/shared/types/game-modes";
import cl from "./game-modes-sidebar-list.module.scss";
import cn from "classnames";
import { Link } from "@/shared/config/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { searchGameModel } from "../../model/search-game-slice";

const GameModesSidebarListItem = ({
  isActive,
  mode,
}: {
  mode: GameModes;
  isActive: boolean;
}) => {
  const t = useTranslations("GameModes");

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(searchGameModel.setActiveMode(mode));
  };

  return (
    <li className={cl.item} onClick={handleClick}>
      <Link href={`/lobby?mode=${mode}`}>
        <div
          className={cn(cl.linkButton, {
            [cl.active]: isActive,
          })}
        >
          {t(mode)}
        </div>
      </Link>
    </li>
  );
};

export const GameModesSidebarList = ({
  activeMode,
  modes,
}: {
  modes: GameModes[];
  activeMode?: string | null;
}) => {
  return (
    <ul className={cl.list}>
      {modes.map((mode) => (
        <GameModesSidebarListItem
          mode={mode}
          isActive={mode === activeMode}
          key={mode}
        />
      ))}
    </ul>
  );
};
