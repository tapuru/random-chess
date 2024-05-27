"use client";

import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import cl from "./game-moves.module.scss";
import { selectGame } from "../../model/game-slice";
import { Move } from "chess.js";

const SingleTurn = ({ move }: { move: Move }) => {
  return <div className={cl.move}>{move.san}</div>;
};

export const GameMoves = () => {
  const game = useAppSelector(selectGame);

  const moveRows: Move[][] = [[]];
  game?.moves.forEach((move, index) => {
    if (moveRows[moveRows.length - 1].length < 2) {
      moveRows[moveRows.length - 1].push(move);
    } else {
      moveRows.push([move]);
    }
  });

  return (
    <div className={cl.root}>
      <ul className={cl.moveList}>
        {!!game?.moves.length &&
          moveRows.map((moveRow, index) => (
            <li className={cl.moveRow} key={index}>
              <div className={cl.rowNumber}>{`${index + 1}.`}</div>
              {moveRow[0] && <SingleTurn move={moveRow[0]} />}
              {moveRow[1] && <SingleTurn move={moveRow[1]} />}
            </li>
          ))}
      </ul>
    </div>
  );
};
