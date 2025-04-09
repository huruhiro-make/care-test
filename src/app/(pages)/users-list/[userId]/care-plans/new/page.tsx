'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CarePlanForm from '@/components/CarePlanForm';
import RightSidebar from '@/components/RightSidebar';
import CarePlanHeader from '@/components/CarePlanHeader';

export default function NewCarePlan() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ダミーデータ（実際のアプリケーションではAPIから取得）
  const userData = {
    userName: '山田 太郎',
    careLevel: '要介護3',
    certificationPeriod: '2024/04/01 ～ 2024/09/30',
    creationDate: '2024/03/15',
    planNumber: 'CP-2024-001',
  };

  return (
    <div className="flex">
      <div className={`flex-1 p-6 ${isSidebarOpen ? 'pr-8' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-800">新規ケアプラン作成</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>戻る</span>
          </button>
        </div>

        <CarePlanHeader
          userName={userData.userName}
          careLevel={userData.careLevel}
          certificationPeriod={userData.certificationPeriod}
          creationDate={userData.creationDate}
          planNumber={userData.planNumber}
        />

        <CarePlanForm />
      </div>

      <RightSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
} 