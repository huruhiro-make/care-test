'use client';

import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900">
            介護計画書作成支援システム
          </h1>
          <p className="mt-2 text-center text-gray-600">
            介護計画書の作成を支援するシステムです
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/users-list')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            利用者一覧へ
          </button>
          <button
            onClick={() => router.push('/plan')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            介護計画書作成へ
          </button>
        </div>
      </div>
    </div>
  );
}
