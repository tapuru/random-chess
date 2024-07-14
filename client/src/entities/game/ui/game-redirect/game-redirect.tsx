"use client";
import { AppLoader } from "@/shared/ui/app-loader/app-loader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const GameRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies] = useCookies(["NEXT_LOCALE"]);

  useEffect(() => {
    if (pathname) router.push(`/${cookies.NEXT_LOCALE ?? "en"}/${pathname}`);
  }, []);

  //TODO: add loader
  return <AppLoader fullscreen />;
};
