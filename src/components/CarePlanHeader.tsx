'use client';

import type { ReactElement } from 'react';

export default function CarePlanHeader(): ReactElement {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">介護計画書</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">富士川支援 広瀬</span>
          </div>
        </div>
      </div>
    </div>
  );
} 