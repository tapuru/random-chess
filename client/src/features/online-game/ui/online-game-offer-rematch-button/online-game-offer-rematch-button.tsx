import { AppText } from "@/shared/ui/app-text/app-text";
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
  const { handleClick, isLoading, rematchOfferSent, title } = result;

  if (rematchOfferSent) {
    return <AppText tag="p">rematch offer sent</AppText>;
  }

  return (
    <AppButton disabled={isLoading} onClick={handleClick}>
      {title}
    </AppButton>
  );
};
