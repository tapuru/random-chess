"use client";

import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import cl from "./game-moves.module.scss";
import { selectGame } from "../../model/game-slice";
import { Move } from "chess.js";

const SingleTurn = ({ move }: { move: Move }) => {
  return <div className={cl.turn}>{move.san}</div>;
};

export const GameMoves = () => {
  const game = useAppSelector(selectGame);

  const turnRows: Move[][] = [[]];
  game?.moves.forEach((move, index) => {
    if (turnRows[turnRows.length - 1].length < 2) {
      turnRows[turnRows.length - 1].push(move);
    } else {
      turnRows.push([move]);
    }
  });

  return (
    <div className={cl.root}>
      <ul className={cl.turnList}>
        {!!game?.moves.length &&
          turnRows.map((turnRow, index) => (
            <li className={cl.turnRow} key={index}>
              <div>{`${index + 1}.`}</div>
              {turnRow[0] && <SingleTurn move={turnRow[0]} />}
              {turnRow[1] && <SingleTurn move={turnRow[1]} />}
            </li>
          ))}
      </ul>
    </div>
  );
};
