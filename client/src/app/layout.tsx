export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return children;
}
