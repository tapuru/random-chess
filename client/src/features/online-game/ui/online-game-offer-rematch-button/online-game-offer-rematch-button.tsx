import { useOnlineGameOfferRematchButton } from "../../model/use-online-game-offer-rematch-button";
import { AppButton } from "@/shared/ui/app-button/app-button";

export const OnlineGameOfferRematchButton = ({
  onOfferRematch,
}: {
  onOfferRematch?: () => void;
  title?: string;
}) => {
  const result = useOnlineGameOfferRematchButton(onOfferRematch);

  if (!result) return null;
  const {
    handleCancelClick,
    handleRematchClick,
    isLoading,
    rematchOfferSent,
    title,
  } = result;

  if (rematchOfferSent) {
    return (
      <AppButton
        variant="outlined"
        color="secondary"
        onClick={handleCancelClick}
      >
        {title}
      </AppButton>
    );
  }

  return (
    <AppButton
      disabled={isLoading}
      onClick={handleRematchClick}
      color="secondary"
    >
      {title}
    </AppButton>
  );
};
