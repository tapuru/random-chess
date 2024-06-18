import { Container } from "@/shared/ui/container/container";
import { AuthForm } from "@/widgets/auth-form";
import { AuthPageLayout } from "./ui/auth-page-layout";

export const AuthPage = () => {
  return (
    <main>
      <Container>
        <AuthPageLayout>
          <AuthForm />
        </AuthPageLayout>
      </Container>
    </main>
  );
};
