import { Container } from "@/shared/ui/container/container";
import { AuthForm } from "@/widgets/auth-form";
import { AuthPageLayout } from "./ui/auth-page-layout";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";

export const AuthPage = () => {
  return (
    <Container>
      <main>
        <AuthPageLayout>
          <AuthForm />
        </AuthPageLayout>
      </main>
    </Container>
  );
};
