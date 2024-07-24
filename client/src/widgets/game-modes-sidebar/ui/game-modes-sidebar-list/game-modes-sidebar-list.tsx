import { GameModes } from "@/shared/types/game-modes";
import cl from "./game-modes-sidebar-list.module.scss";
import cn from "classnames";
import { Link } from "@/shared/config/navigation";

const GameModesSidebarListItem = ({
  isActive,
  mode,
}: {
  mode: GameModes;
  isActive: boolean;
}) => {
  return (
    <li className={cl.item}>
      <Link href={`/lobby?mode=${mode}`}>
        <div
          className={cn(cl.linkButton, {
            [cl.active]: isActive,
          })}
        >
          {mode}
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
        <GameModesSidebarListItem mode={mode} isActive={mode === activeMode} />
      ))}
    </ul>
  );
};
