'use client';

import { ReactElement } from 'react';

interface CarePlanHeaderProps {
  userName: string;
  careLevel: string;
  certificationPeriod: string;
  creationDate: string;
  planNumber: string;
}

export default function CarePlanHeader({
  userName,
  careLevel,
  certificationPeriod,
  creationDate,
  planNumber,
}: CarePlanHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">利用者名</h3>
          <p className="text-lg font-semibold text-gray-900">{userName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">要介護度</h3>
          <p className="text-lg font-semibold text-gray-900">{careLevel}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">認定期間</h3>
          <p className="text-lg font-semibold text-gray-900">{certificationPeriod}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">作成日</h3>
          <p className="text-lg font-semibold text-gray-900">{creationDate}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">ケアプランナンバー</h3>
          <p className="text-lg font-semibold text-gray-900">{planNumber}</p>
        </div>
      </div>
    </div>
  );
} 