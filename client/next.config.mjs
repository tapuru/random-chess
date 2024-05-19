import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/app/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [".src/app/styles"],
  },
};

export default withNextIntl(nextConfig);
