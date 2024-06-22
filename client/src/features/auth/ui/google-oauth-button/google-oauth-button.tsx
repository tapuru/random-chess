"use client";

import { useRouter } from "@/shared/config/navigation";
import { AppButton } from "@/shared/ui/app-button/app-button";

export const GoogleOAuthButton = () => {
  const router = useRouter();
  const hadleClick = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`);
  };

  return (
    <AppButton variant="outlined" color="primary" onClick={hadleClick}>
      Login with google
    </AppButton>
  );
};
