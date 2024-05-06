import Image from "next/image";
import { Piece } from "../../model/piece/Piece";
import cl from "./PieceUI.module.scss";

interface PieceUIProps {
  piece: Piece;
}

export const PieceUI = ({ piece }: PieceUIProps) => {
  return <div className={cl.root}></div>;
};
