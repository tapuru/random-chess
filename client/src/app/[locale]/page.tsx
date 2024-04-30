import HomePage from "@/pages/home-page";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");

  return <HomePage />;
}
