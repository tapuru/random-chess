"use client";

import { useRouter } from "@/shared/config/navigation";
import { AppButton } from "@/shared/ui/app-button/app-button";
import cl from "./leave-game-button.module.scss";
import { GrClose } from "react-icons/gr";

export const LeaveGameButton = ({
  onLeave,
  title,
}: {
  title?: string;
  onLeave?: () => void;
}) => {
  const router = useRouter();

  const handleClick = () => {
    onLeave?.();
    router.push("/");
  };

  return (
    <AppButton
      size={title ? "md" : "sm"}
      className={cl.root}
      onClick={handleClick}
      variant="filled"
      color="primary"
      icon={title ? null : <GrClose />}
    >
      {title}
    </AppButton>
  );
};
