"use client";

import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import cl from "./game-turns.module.scss";
import { selectGame } from "../../model/game-slice";
import { Turn } from "@/shared/types/turn";

const SingleTurn = ({ turn }: { turn: Turn }) => {
  return (
    <div className={cl.turn}>
      {`${turn.piece}${turn.captured ? "x" : ""}${turn.toPosition.notation}`}
    </div>
  );
};

export const GameTurns = () => {
  const game = useAppSelector(selectGame);

  const turnRows: Turn[][] = [[]];
  game?.turns.forEach((turn, index) => {
    if (turnRows[turnRows.length - 1].length < 2) {
      turnRows[turnRows.length - 1].push(turn);
    } else {
      turnRows.push([turn]);
    }
  });

  return (
    <div className={cl.root}>
      <ul className={cl.turnList}>
        {!!game?.turns.length &&
          turnRows.map((turnRow, index) => (
            <li className={cl.turnRow} key={index}>
              <div>{`${index + 1}.`}</div>
              {turnRow[0] && <SingleTurn turn={turnRow[0]} />}
              {turnRow[1] && <SingleTurn turn={turnRow[1]} />}
            </li>
          ))}
      </ul>
    </div>
  );
};
