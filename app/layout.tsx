import './globals.css';

export const metadata = {
  title: 'Malleable Software — Knowledge, made malleable',
  description: 'AI-powered tools for connected thinking. Malleable Software is exploring personal knowledge, human curiosity, and collective discovery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
