export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>Fim dos Dias</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
