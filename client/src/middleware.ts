import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "@/shared/config/navigation";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(ru|en)/:path*"],
};
