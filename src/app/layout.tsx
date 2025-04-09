import { Inter } from 'next/font/google';
import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import "./globals.css";
import DndWrapper from '@/components/DndWrapper';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "介護支援システム",
  description: "介護支援システムのデモアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <DndWrapper>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </DndWrapper>
      </body>
    </html>
  );
}
