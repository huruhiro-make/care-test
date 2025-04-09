import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from '@/components/Sidebar';
import DndWrapper from '@/components/DndWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <DndWrapper>
          <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div className="pl-64">
              {/* ヘッダーナビゲーション */}
              <nav className="bg-white shadow-sm">
                <div className="max-w-full mx-auto px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-700 font-medium">介護支援システム</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">富士川支援 広瀬</span>
                    </div>
                  </div>
                </div>
              </nav>
              {children}
            </div>
          </div>
        </DndWrapper>
      </body>
    </html>
  );
}
