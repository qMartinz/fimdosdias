export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head></head>
      <body>
        {children}
      </body>
    </html>
  );
}
