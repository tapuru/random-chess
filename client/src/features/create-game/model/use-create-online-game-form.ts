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
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import {
  apiErrorSchema,
  isApiError,
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@/shared/lib/api-helpers";
import { getErrorToastConfig } from "@/shared/lib/toast-helpers";
import { useTranslations } from "use-intl";
import { useHandleApiError } from "@/shared/lib/hooks/use-handle-api-error";

export const useCreateOnlineGameForm = () => {
  const user = useAppSelector(selectUser);
  const [serverError, setServerError] = useState<string | null>(null);
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
  const [createGame, { isLoading }] = gameApi.useCreateGameMutation();

  const { handleApiError } = useHandleApiError();
  const currentTime = watch("settings.time");
  const currentTimeControl = currentTime
    ? getTimeControlFromSeconds(currentTime)
    : null;

  const submit: SubmitHandler<CreateOnlineGameFormData> = async (data) => {
    try {
      const game = await createGame(data).unwrap();
      router.push(`/game/${game.id}`);
    } catch (error) {
      handleApiError(error, (message) => {
        setServerError(message);
      });
    }
  };

  return {
    control,
    formState,
    currentTimeControl,
    handleSubmit: handleSubmit(submit),
    isLoading,
    serverError,
  };
};
