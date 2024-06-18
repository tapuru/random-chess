"use client";

import { LoginForm, RegistrationForm } from "@/features/auth";
import { Link, usePathname } from "@/shared/config/navigation";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { AppText } from "@/shared/ui/app-text/app-text";
import cl from "./auth-form.module.scss";
import { AuthFormLayout } from "../auth-form-layout/auth-form-layout";

export const AuthForm = () => {
  const pathname = usePathname();

  const isLogin = pathname === "/login";

  return (
    <AppCard className={cl.root}>
      <AppCard.Content>
        <AuthFormLayout
          header={
            <AppText tag="h2">{isLogin ? "Login" : "Registration"}</AppText>
          }
          form={isLogin ? <LoginForm /> : <RegistrationForm/>}
          link={
            isLogin ? (
              <AppText tag="p">
                Do not have an account?{" "}
                <Link href="/register">Registration</Link>
              </AppText>
            ) : (
              <AppText tag="p">
                Already have an account? <Link href="/login">Login</Link>
              </AppText>
            )
          }
        />
      </AppCard.Content>
    </AppCard>
  );
};
