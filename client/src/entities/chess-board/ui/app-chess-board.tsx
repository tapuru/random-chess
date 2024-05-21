import { Chessboard } from "react-chessboard";

interface AppChessboardProps {
  position: string;
  onMove: () => void;
}

export const AppChessboard = ({ position }: AppChessboardProps) => {
  return <Chessboard position={position} />;
};
