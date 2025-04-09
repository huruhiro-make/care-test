import type { ReactElement } from 'react';

export default function DashboardPage(): ReactElement {
  return (
    <div className="max-w-full mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">ダッシュボード</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* ダミーのダッシュボードカード */}
          <div className="bg-emerald-50 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-medium text-emerald-800 mb-2">本日の予定</h3>
            <p className="text-emerald-600">5件の訪問予定があります</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-medium text-emerald-800 mb-2">未完了の計画書</h3>
            <p className="text-emerald-600">3件の計画書が未完了です</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-medium text-emerald-800 mb-2">新着通知</h3>
            <p className="text-emerald-600">2件の新着通知があります</p>
          </div>
        </div>
      </div>
    </div>
  );
} 