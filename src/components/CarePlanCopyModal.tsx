'use client';

import { ReactElement } from 'react';

interface CarePlanCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: (planId: string) => void;
  onNew: () => void;
  existingPlans: Array<{
    id: string;
    certificationPeriod: string;
    status: string;
  }>;
}

export default function CarePlanCopyModal({
  isOpen,
  onClose,
  onCopy,
  onNew,
  existingPlans
}: CarePlanCopyModalProps): ReactElement {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6">
          <h2 className="text-xl font-bold text-emerald-800 mb-4">新規ケアプラン作成</h2>
          <p className="text-gray-600 mb-6">新規作成するか、既存のケアプランをコピーして作成するかを選択してください。</p>

          <div className="space-y-4 mb-6">
            <button
              onClick={onNew}
              className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>新規作成</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">既存のケアプランからコピー</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {existingPlans.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => onCopy(plan.id)}
                    className="w-full text-left p-4 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-emerald-800 font-medium">{plan.certificationPeriod}</p>
                        <p className="text-sm text-gray-600">ステータス: {plan.status}</p>
                      </div>
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 