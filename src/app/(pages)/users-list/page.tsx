'use client';

import { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  age: number;
  careLevel: string;
  address: string;
  lastVisit: string;
  nextVisit: string;
  certificationPeriod: string;
}

const dummyUsers: User[] = [
  {
    id: '1',
    name: '山田 太郎',
    age: 85,
    careLevel: '要介護3',
    address: '東京都渋谷区神宮前1-1-1',
    lastVisit: '2024/03/15',
    nextVisit: '2024/03/20',
    certificationPeriod: '2024/03/01 ～ 2024/08/31'
  },
  {
    id: '2',
    name: '鈴木 花子',
    age: 78,
    careLevel: '要介護2',
    address: '東京都新宿区新宿2-2-2',
    lastVisit: '2024/03/14',
    nextVisit: '2024/03/19',
    certificationPeriod: '2024/02/15 ～ 2024/08/14'
  },
  {
    id: '3',
    name: '佐藤 一郎',
    age: 92,
    careLevel: '要介護4',
    address: '東京都品川区品川3-3-3',
    lastVisit: '2024/03/13',
    nextVisit: '2024/03/18',
    certificationPeriod: '2024/01/20 ～ 2024/07/19'
  },
  {
    id: '4',
    name: '田中 美咲',
    age: 88,
    careLevel: '要介護1',
    address: '東京都目黒区目黒4-4-4',
    lastVisit: '2024/03/12',
    nextVisit: '2024/03/17',
    certificationPeriod: '2024/02/01 ～ 2024/07/31'
  },
  {
    id: '5',
    name: '中村 健一',
    age: 82,
    careLevel: '要介護3',
    address: '東京都世田谷区世田谷5-5-5',
    lastVisit: '2024/03/11',
    nextVisit: '2024/03/16',
    certificationPeriod: '2024/01/15 ～ 2024/07/14'
  }
];

export default function UsersListPage(): ReactElement {
  const router = useRouter();

  const handleCarePlanClick = (userId: string) => {
    router.push(`/users-list/${userId}/care-plans`);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">利用者一覧</h1>
          <p className="text-gray-600 mt-2">登録されている利用者の一覧です</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>利用者登録</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyUsers.map(user => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-emerald-800">{user.name}</h2>
                <p className="text-gray-600">{user.age}歳</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  {user.careLevel}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">住所：</span>
                {user.address}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">認定期間：</span>
                {user.certificationPeriod}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">前回訪問：</span>
                {user.lastVisit}
              </p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">次回訪問：</span>
                {user.nextVisit}
              </p>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                詳細を見る
              </button>
              <button
                onClick={() => handleCarePlanClick(user.id)}
                className="flex-1 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
              >
                ケアプラン
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 