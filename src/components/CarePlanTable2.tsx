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
    const maxId = Math.max(...rows.map((row) => row.id), 0);
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
    setRows(
      rows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  const createDropTarget = (id: number, field: keyof Row) => {
    const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>(() => ({
      accept: 'EXAMPLE',
      drop: (item) => {
        updateRow(id, field, item.content);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return { isOver, drop: drop as unknown as React.RefObject<HTMLDivElement> };
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              利用者意向
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              課題分析
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
                    ref={intentionDrop.drop}
                    className={`p-2 border rounded ${
                      intentionDrop.isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
                    }`}
                  >
                    <textarea
                      value={row.intention}
                      onChange={(e) => updateRow(row.id, 'intention', e.target.value)}
                      className="w-full h-24 p-1 border-0 focus:ring-0"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    ref={issuesDrop.drop}
                    className={`p-2 border rounded ${
                      issuesDrop.isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
                    }`}
                  >
                    <textarea
                      value={row.issues}
                      onChange={(e) => updateRow(row.id, 'issues', e.target.value)}
                      className="w-full h-24 p-1 border-0 focus:ring-0"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    ref={longTermGoalsDrop.drop}
                    className={`p-2 border rounded ${
                      longTermGoalsDrop.isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
                    }`}
                  >
                    <textarea
                      value={row.longTermGoals}
                      onChange={(e) => updateRow(row.id, 'longTermGoals', e.target.value)}
                      className="w-full h-24 p-1 border-0 focus:ring-0"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    ref={shortTermGoalsDrop.drop}
                    className={`p-2 border rounded ${
                      shortTermGoalsDrop.isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
                    }`}
                  >
                    <textarea
                      value={row.shortTermGoals}
                      onChange={(e) => updateRow(row.id, 'shortTermGoals', e.target.value)}
                      className="w-full h-24 p-1 border-0 focus:ring-0"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    ref={serviceContentDrop.drop}
                    className={`p-2 border rounded ${
                      serviceContentDrop.isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
                    }`}
                  >
                    <textarea
                      value={row.serviceContent}
                      onChange={(e) => updateRow(row.id, 'serviceContent', e.target.value)}
                      className="w-full h-24 p-1 border-0 focus:ring-0"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    ref={serviceTypeDrop.drop}
                    className={`p-2 border rounded ${
                      serviceTypeDrop.isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
                    }`}
                  >
                    <textarea
                      value={row.serviceType}
                      onChange={(e) => updateRow(row.id, 'serviceType', e.target.value)}
                      className="w-full h-24 p-1 border-0 focus:ring-0"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          行を追加
        </button>
      </div>
    </div>
  );
} 