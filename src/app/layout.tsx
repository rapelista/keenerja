import { Providers } from '~/components/providers';
import { Toaster } from '~/components/ui/sonner';
import '~/styles/globals.css';

export { metadata } from '~/configs/metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>

        <Toaster />
      </body>
    </html>
  );
}
