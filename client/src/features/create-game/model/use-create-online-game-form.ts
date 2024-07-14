import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChessColors } from "@/shared/types/chess-colors";
import { GameModes } from "@/shared/types/game-modes";
import {
  CreateOnlineGameFormData,
  createOnlineGameSchema,
  gameApi,
  getTimeControlFromSeconds,
} from "@/entities/game";
import { GameTypes } from "@/shared/types/game-type";
import { TimeControls } from "@/shared/types/time-controls";
import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { selectUser } from "@/entities/auth";
import { useRouter } from "@/shared/config/navigation";

export const useCreateOnlineGameForm = () => {
  const user = useAppSelector(selectUser);
  const { control, formState, watch, handleSubmit } =
    useForm<CreateOnlineGameFormData>({
      resolver: zodResolver(createOnlineGameSchema),
      defaultValues: {
        initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        ownerColor: ChessColors.WHITE,
        ownerId: user?.id,
        settings: {
          gameMode: GameModes.CLASSICAL,
          time: 0,
          timeIncrement: 0,
          gameType: GameTypes.ONLINE,
          timeControl: TimeControls.BLITZ,
        },
      },
    });
  const router = useRouter();
  const [createGame, { isLoading }] = gameApi.useCreateOnlineGameMutation();

  const currentTime = watch("settings.time");
  const currentTimeControl = currentTime
    ? getTimeControlFromSeconds(currentTime)
    : null;

  const submit: SubmitHandler<CreateOnlineGameFormData> = async (data) => {
    try {
      const game = await createGame(data).unwrap();
      router.push(`/game/${game.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    control,
    formState,
    currentTimeControl,
    handleSubmit: handleSubmit(submit),
    isLoading,
  };
};
