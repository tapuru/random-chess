"use client";

import cl from "./game-moves.module.scss";
import { Move } from "chess.js";

const SingleMove = ({ move }: { move: Move }) => {
  return <div className={cl.move}>{move.san}</div>;
};

export const GameMoves = ({ moves }: { moves: Move[] }) => {
  const moveRows: Move[][] = [[]];

  !!moves &&
    moves.forEach((move, index) => {
      if (moveRows[moveRows.length - 1].length < 2) {
        moveRows[moveRows.length - 1].push(move);
      } else {
        moveRows.push([move]);
      }
    });

  return (
    <div className={cl.root}>
      <ul className={cl.moveList}>
        {moves &&
          moves.length &&
          moveRows.map((moveRow, index) => (
            <li className={cl.moveRow} key={index}>
              <div className={cl.rowNumber}>{`${index + 1}.`}</div>
              {moveRow[0] && <SingleMove move={moveRow[0]} />}
              {moveRow[1] && <SingleMove move={moveRow[1]} />}
            </li>
          ))}
      </ul>
    </div>
  );
};
