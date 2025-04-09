'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { useDrop } from 'react-dnd';

interface Row {
  id: number;
  intention: string;
  issues: string;
  longTermGoals: string;
  shortTermGoals: string;
  serviceContent: string;
  serviceType: string;
}

interface DropItem {
  category: string;
  content: string;
}

export default function CarePlanTable2(): ReactElement {
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      intention: '',
      issues: '',
      longTermGoals: '',
      shortTermGoals: '',
      serviceContent: '',
      serviceType: '',
    },
  ]);

  const addRow = (): void => {
    const maxId = Math.max(...rows.map(row => row.id), 0);
    setRows([
      ...rows,
      {
        id: maxId + 1,
        intention: '',
        issues: '',
        longTermGoals: '',
        shortTermGoals: '',
        serviceContent: '',
        serviceType: '',
      },
    ]);
  };

  const updateRow = (id: number, field: keyof Row, value: string): void => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const createDropTarget = (id: number, field: keyof Row) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'EXAMPLE',
      drop: (item: DropItem) => {
        const categoryToField: Record<string, keyof Row> = {
          '利用者意向': 'intention',
          '課題': 'issues',
          '長期目標': 'longTermGoals',
          '短期目標': 'shortTermGoals',
          'サービス内容': 'serviceContent',
          'サービス種別': 'serviceType',
        };

        const targetField = categoryToField[item.category];
        if (targetField === field) {
          updateRow(id, field, item.content);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }), [rows, field]);

    return { isOver, drop };
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                利用者意向
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                課題
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                長期目標
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                短期目標
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                サービス内容
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                サービス種別
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row) => {
              const intentionDrop = createDropTarget(row.id, 'intention');
              const issuesDrop = createDropTarget(row.id, 'issues');
              const longTermGoalsDrop = createDropTarget(row.id, 'longTermGoals');
              const shortTermGoalsDrop = createDropTarget(row.id, 'shortTermGoals');
              const serviceContentDrop = createDropTarget(row.id, 'serviceContent');
              const serviceTypeDrop = createDropTarget(row.id, 'serviceType');

              return (
                <tr key={row.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      ref={intentionDrop.drop as unknown as React.RefObject<HTMLDivElement>}
                      className={`${intentionDrop.isOver ? 'bg-emerald-50' : ''}`}
                    >
                      <textarea
                        value={row.intention}
                        onChange={(e) => updateRow(row.id, 'intention', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      ref={issuesDrop.drop as unknown as React.RefObject<HTMLDivElement>}
                      className={`${issuesDrop.isOver ? 'bg-emerald-50' : ''}`}
                    >
                      <textarea
                        value={row.issues}
                        onChange={(e) => updateRow(row.id, 'issues', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      ref={longTermGoalsDrop.drop as unknown as React.RefObject<HTMLDivElement>}
                      className={`${longTermGoalsDrop.isOver ? 'bg-emerald-50' : ''}`}
                    >
                      <textarea
                        value={row.longTermGoals}
                        onChange={(e) => updateRow(row.id, 'longTermGoals', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      ref={shortTermGoalsDrop.drop as unknown as React.RefObject<HTMLDivElement>}
                      className={`${shortTermGoalsDrop.isOver ? 'bg-emerald-50' : ''}`}
                    >
                      <textarea
                        value={row.shortTermGoals}
                        onChange={(e) => updateRow(row.id, 'shortTermGoals', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      ref={serviceContentDrop.drop as unknown as React.RefObject<HTMLDivElement>}
                      className={`${serviceContentDrop.isOver ? 'bg-emerald-50' : ''}`}
                    >
                      <textarea
                        value={row.serviceContent}
                        onChange={(e) => updateRow(row.id, 'serviceContent', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      ref={serviceTypeDrop.drop as unknown as React.RefObject<HTMLDivElement>}
                      className={`${serviceTypeDrop.isOver ? 'bg-emerald-50' : ''}`}
                    >
                      <textarea
                        value={row.serviceType}
                        onChange={(e) => updateRow(row.id, 'serviceType', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={addRow}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          行を追加
        </button>
      </div>
    </div>
  );
} 