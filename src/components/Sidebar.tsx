'use client';

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar(): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('plan');

  useEffect(() => {
    // パスからアクティブなメニューを設定
    const path = pathname.split('/')[1] || 'dashboard';
    setActiveMenu(path);
  }, [pathname]);

  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: '📊', path: '/dashboard' },
    { id: 'users-list', label: '利用者一覧', icon: '👥', path: '/users-list' },
    { id: 'users', label: '利用者管理', icon: '👥', path: '/users' },
    { id: 'schedule', label: 'スケジュール', icon: '📅', path: '/schedule' },
    { id: 'reports', label: '帳票管理', icon: '📋', path: '/reports' },
    { id: 'settings', label: '設定', icon: '⚙️', path: '/settings' },
  ];

  const handleMenuClick = (path: string, id: string) => {
    setActiveMenu(id);
    router.push(path);
  };

  return (
    <div className="w-64 bg-emerald-50 h-screen fixed left-0 top-0 shadow-lg border-r border-emerald-100">
      <div className="p-4 bg-emerald-100 border-b border-emerald-200">
        <h1 className="text-xl font-bold text-emerald-800">介護支援システム</h1>
      </div>
      <nav className="p-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.path, item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center space-x-3 transition-all duration-200 ${
              activeMenu === item.id
                ? 'bg-emerald-200 text-emerald-900 shadow-md'
                : 'hover:bg-emerald-100 text-emerald-700 hover:shadow-sm'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
} 