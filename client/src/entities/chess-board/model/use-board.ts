import { Chess, Move } from "chess.js";
import { boardActions, selectBoard } from "./board-slice";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import {
  PromotionPieceOption,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { OptionSquares } from "../types/option-squares";

export const useBoard = (
  chess: Chess,
  setChess: (chess: Chess) => void,
  onChange?: (move: Move) => void
) => {
  const { fromSquare, toSquare } = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();
  const {
    setFromSquare,
    setOptionSquares,
    setShowPromotionDialog,
    setToSquare,
  } = boardActions;

  function getMoveOptions(square: Square) {
    const moves = chess.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      dispatch(setOptionSquares({}));
      return false;
    }

    const newSquares: OptionSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          chess.get(move.to) &&
          chess.get(move.to).color !== chess.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    dispatch(setOptionSquares(newSquares));
    return true;
  }

  function handleSquareClick(square: Square) {
    // from square
    if (!fromSquare) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) dispatch(setFromSquare(square));
      return;
    }

    // to square
    if (!toSquare) {
      // check if valid move before showing dialog
      const moves = chess.moves({
        square: fromSquare,
        verbose: true,
      });
      const foundMove = moves.find(
        (m) => m.from === fromSquare && m.to === square
      );
      // not a valid move
      if (!foundMove) {
        // check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square);
        // if new piece, setMoveFrom, otherwise clear moveFrom
        dispatch(setFromSquare(hasMoveOptions ? square : null));
        return;
      }

      // valid move
      dispatch(setToSquare(square));

      // if promotion move
      if (
        (foundMove.color === "w" &&
          foundMove.piece === "p" &&
          square[1] === "8") ||
        (foundMove.color === "b" &&
          foundMove.piece === "p" &&
          square[1] === "1")
      ) {
        dispatch(setShowPromotionDialog(true));
        return;
      }

      // is normal move
      const gameCopy = new Chess(chess.fen());
      gameCopy.history = chess.history;
      const move = gameCopy.move({
        from: fromSquare,
        to: square,
        promotion: "q",
      });

      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) dispatch(setFromSquare(square));
        return;
      }

      setChess(gameCopy);

      onChange?.(move);

      dispatch(setFromSquare(null));
      dispatch(setToSquare(null));
      dispatch(setOptionSquares({}));
      return;
    }
  }

  function handlePromotionPieceSelect(
    piece?: PromotionPieceOption | undefined
  ) {
    // if no piece passed then user has cancelled dialog, don't make move and reset

    if (!fromSquare || !toSquare) return false;
    if (piece) {
      const gameCopy = new Chess(chess.fen());
      gameCopy.history = chess.history;
      gameCopy.move({
        from: fromSquare,
        to: toSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      setChess(gameCopy);
    }

    dispatch(setFromSquare(null));
    dispatch(setToSquare(null));
    dispatch(setShowPromotionDialog(false));
    dispatch(setOptionSquares({}));
    return true;
  }

  return { handlePromotionPieceSelect, handleSquareClick };
};
