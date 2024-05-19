import { LocalGameBoard } from "@/features/room";
import cl from "./game-page.module.scss";
import { Container } from "@/shared/ui/container/container";
import { RoomInfo } from "@/widgets/room-info";

export const GamePage = () => {
  return (
    <Container>
      <main className={cl.root}>
        <div className={cl.board}>
          <LocalGameBoard />
        </div>
        <div className={cl.roomInfo}>
          <RoomInfo />
        </div>
      </main>
    </Container>
  );
};
