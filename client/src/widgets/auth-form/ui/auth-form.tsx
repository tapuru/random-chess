"use client";

import { LoginForm, RegistrationForm } from "@/features/auth";
import { usePathname, useRouter } from "@/shared/config/navigation";
import { useParams } from "next/navigation";

export const AuthForm = () => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <LoginForm />;
  }

  if (pathname === "/register") {
    return <RegistrationForm />;
  }

  return null;
};
