import Image from "next/image";
import { Piece } from "../../model/piece/Piece";
import cl from "./lost-pieces.module.scss";
interface LostPiecesProps {
  title: string;
  pieces: Piece[];
}

export const LostPieces = ({ pieces, title }: LostPiecesProps) => {
  return (
    <div className={cl.root}>
      <h1>{title}</h1>
      <ul className={cl.list}>
        {pieces.map((piece) => (
          <li className={cl.item} key={piece.id}>
            {piece.image && (
              <Image
                width={50}
                height={50}
                src={piece.image}
                alt={piece.notation}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
