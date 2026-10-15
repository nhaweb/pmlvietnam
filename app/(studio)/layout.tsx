export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
