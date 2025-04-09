'use client';

import { useRouter } from 'next/navigation';
import { useState, type ReactElement } from 'react';

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
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (userId: string): void => {
    router.push(`/users-list/${userId}/care-plans`);
  };

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">利用者一覧</h1>
            <div className="flex-1 max-w-md ml-4">
              <input
                type="text"
                placeholder="利用者を検索..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <li key={user.id} onClick={() => handleUserClick(user.id)} className="cursor-pointer hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{user.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {user.age}歳 / {user.careLevel}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          次回訪問: {user.nextVisit}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">
                        <p>住所: {user.address}</p>
                        <p>前回訪問: {user.lastVisit}</p>
                        <p>認定期間: {user.certificationPeriod}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 