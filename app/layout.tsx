import './globals.css';

export const metadata = {
  title: 'Malleable Software',
  description: 'Malleable Software — Cupertino, CA. Contact: reach@malleablesoft.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
