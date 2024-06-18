"use client";

import { useRouter } from "@/shared/config/navigation";
import { AppButton } from "@/shared/ui/app-button/app-button";

export const LoginButton = () => {
  const router = useRouter();

  return (
    <AppButton
      variant="outlined"
      size="sm"
      color="primary"
      onClick={() => router.push("/login")}
    >
      Login
    </AppButton>
  );
};
