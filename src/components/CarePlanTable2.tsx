'use client';

import { useState, type ReactElement } from 'react';
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

interface DropTargetProps {
  id: number;
  field: keyof Row;
  onDrop: (id: number, field: keyof Row, value: string) => void;
  children: React.ReactNode;
}

const DropTarget = ({ id, field, onDrop, children }: DropTargetProps): ReactElement => {
  const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>(() => ({
    accept: 'EXAMPLE',
    drop: (item) => {
      onDrop(id, field, item.content);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`p-2 border rounded ${
        isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
      }`}
    >
      {children}
    </div>
  );
};

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

  return (
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
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <DropTarget id={row.id} field="intention" onDrop={updateRow}>
                  <textarea
                    value={row.intention}
                    onChange={(e): void => updateRow(row.id, 'intention', e.target.value)}
                    className="w-full p-1 border-0 focus:ring-0"
                    rows={3}
                  />
                </DropTarget>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <DropTarget id={row.id} field="issues" onDrop={updateRow}>
                  <textarea
                    value={row.issues}
                    onChange={(e): void => updateRow(row.id, 'issues', e.target.value)}
                    className="w-full p-1 border-0 focus:ring-0"
                    rows={3}
                  />
                </DropTarget>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <DropTarget id={row.id} field="longTermGoals" onDrop={updateRow}>
                  <textarea
                    value={row.longTermGoals}
                    onChange={(e): void => updateRow(row.id, 'longTermGoals', e.target.value)}
                    className="w-full p-1 border-0 focus:ring-0"
                    rows={3}
                  />
                </DropTarget>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <DropTarget id={row.id} field="shortTermGoals" onDrop={updateRow}>
                  <textarea
                    value={row.shortTermGoals}
                    onChange={(e): void => updateRow(row.id, 'shortTermGoals', e.target.value)}
                    className="w-full p-1 border-0 focus:ring-0"
                    rows={3}
                  />
                </DropTarget>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <DropTarget id={row.id} field="serviceContent" onDrop={updateRow}>
                  <textarea
                    value={row.serviceContent}
                    onChange={(e): void => updateRow(row.id, 'serviceContent', e.target.value)}
                    className="w-full p-1 border-0 focus:ring-0"
                    rows={3}
                  />
                </DropTarget>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <DropTarget id={row.id} field="serviceType" onDrop={updateRow}>
                  <textarea
                    value={row.serviceType}
                    onChange={(e): void => updateRow(row.id, 'serviceType', e.target.value)}
                    className="w-full p-1 border-0 focus:ring-0"
                    rows={3}
                  />
                </DropTarget>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={addRow}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          行を追加
        </button>
      </div>
    </div>
  );
} 