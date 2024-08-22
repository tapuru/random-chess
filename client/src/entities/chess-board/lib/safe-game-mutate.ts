import { Chess } from "chess.js";
import { Dispatch, SetStateAction } from "react";

export const safeGameMutate = (
  chess: Chess,
  setChess: Dispatch<SetStateAction<Chess>>,
  modify: (update: Chess) => void
) => {
  const copy = new Chess(chess.fen());
  modify(copy);
  setChess(copy);
};
