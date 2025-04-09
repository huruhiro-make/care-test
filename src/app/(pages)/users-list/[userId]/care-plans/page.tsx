'use client';

import { useState, type ReactElement } from 'react';

import CarePlanCopyModal from '@/components/CarePlanCopyModal';
import CarePlanHeader from '@/components/CarePlanHeader';

export default function CarePlansPage(): ReactElement {
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const handleCopyClick = (): void => {
    setIsCopyModalOpen(true);
  };

  const handleCopy = (): void => {
    setIsCopyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CarePlanHeader />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">介護計画書一覧</h1>
            <button
              onClick={() => setIsCopyModalOpen(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              新規作成
            </button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3].map((id) => (
                <li key={id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          介護計画書 {id}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          作成日: 2024-03-{id}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCopyClick}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          コピー
                        </button>
                        <button className="text-emerald-600 hover:text-emerald-900">
                          編集
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <CarePlanCopyModal
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        onCopy={handleCopy}
      />
    </div>
  );
} 