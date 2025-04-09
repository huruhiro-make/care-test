'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CarePlanCopyModal from '@/components/CarePlanCopyModal';

interface CarePlan {
  id: string;
  certificationPeriod: string;
  status: string;
  lastModified: string;
  creationDate: string;
  careLevel: string;
}

// ダミーデータ
const dummyCarePlans: CarePlan[] = [
  {
    id: '1',
    certificationPeriod: '2024/04/01 ～ 2024/09/30',
    status: '作成中',
    lastModified: '2024/03/15',
    creationDate: '2024/03/15',
    careLevel: '要介護3',
  },
  {
    id: '2',
    certificationPeriod: '2023/10/01 ～ 2024/03/31',
    status: '完了',
    lastModified: '2024/03/10',
    creationDate: '2023/10/01',
    careLevel: '要介護3',
  },
];

export default function CarePlansList() {
  const params = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = params.userId as string;

  const handleNewPlan = () => {
    setIsModalOpen(false);
    router.push(`/users-list/${userId}/care-plans/new`);
  };

  const handleCopyPlan = (planId: string) => {
    setIsModalOpen(false);
    router.push(`/users-list/${userId}/care-plans/new?copyFrom=${planId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-800">ケアプラン一覧</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>プラン追加</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                認定期間
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                要介護度
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                作成日
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                最終更新日
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-emerald-800 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyCarePlans.map((plan) => (
              <tr key={plan.id} className="hover:bg-emerald-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {plan.certificationPeriod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {plan.careLevel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    plan.status === '作成中' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {plan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.creationDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.lastModified}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-emerald-600 hover:text-emerald-900">
                    編集
                  </button>
                  <button className="text-emerald-600 hover:text-emerald-900">
                    詳細
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CarePlanCopyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNew={handleNewPlan}
        onCopy={handleCopyPlan}
        existingPlans={dummyCarePlans}
      />
    </div>
  );
} 