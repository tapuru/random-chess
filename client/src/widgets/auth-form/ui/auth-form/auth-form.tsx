"use client";

import {
  GoogleOAuthButton,
  LoginForm,
  RegistrationForm,
} from "@/features/auth";
import { Link, usePathname } from "@/shared/config/navigation";
import { AppCard } from "@/shared/ui/app-card/app-card";
import { AppText } from "@/shared/ui/app-text/app-text";
import cl from "./auth-form.module.scss";
import { AuthFormLayout } from "../auth-form-layout/auth-form-layout";
import { useTranslations } from "next-intl";

export const AuthForm = () => {
  const pathname = usePathname();

  const isLogin = pathname === "/login";
  const t = useTranslations("Auth");

  return (
    <AppCard className={cl.root}>
      <AppCard.Content>
        <AuthFormLayout
          header={
            <AppText tag="h2">{isLogin ? t("login") : t("register")}</AppText>
          }
          form={isLogin ? <LoginForm /> : <RegistrationForm />}
          link={
            isLogin ? (
              <AppText tag="p">
                {t("notRegistered")}{" "}
                <Link href="/register">{t("register")}</Link>
              </AppText>
            ) : (
              <AppText tag="p">
                {t("alreadyRegistered")} <Link href="/login">{t("login")}</Link>
              </AppText>
            )
          }
          oauth={isLogin ? <GoogleOAuthButton /> : null}
        />
      </AppCard.Content>
    </AppCard>
  );
};
