'use client';

import { useState, type ReactElement } from 'react';

import CarePlanForm from '@/components/CarePlanForm';
import CarePlanHeader from '@/components/CarePlanHeader';
import CarePlanTable2 from '@/components/CarePlanTable2';
import RightSidebar from '@/components/RightSidebar';

export default function CarePlanDetailPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<'form' | 'table'>('form');

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <CarePlanHeader />
        <div className="p-4">
          <div className="mb-4">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 mr-2 rounded ${
                activeTab === 'form'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              フォーム
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded ${
                activeTab === 'table'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              テーブル
            </button>
          </div>
          {activeTab === 'form' ? <CarePlanForm /> : <CarePlanTable2 />}
        </div>
      </div>
      <RightSidebar screenType={activeTab === 'form' ? 'table1' : 'table2'} />
    </div>
  );
} 