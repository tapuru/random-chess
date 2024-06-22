"use client";

import { useRouter } from "@/shared/config/navigation";
import { AppButton } from "@/shared/ui/app-button/app-button";
import { FaGoogle } from "react-icons/fa";

export const GoogleOAuthButton = () => {
  const router = useRouter();
  const hadleClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`);
  };

  return (
    <AppButton
      variant="outlined"
      color="primary"
      onClick={hadleClick}
      icon={<FaGoogle />}
    >
      Login with google
    </AppButton>
  );
};
