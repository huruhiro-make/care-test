'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { useDrag } from 'react-dnd';

interface Example {
  id: string;
  category: string;
  content: string;
}

interface DragItem {
  type: string;
  category: string;
  content: string;
}

interface RightSidebarProps {
  screenType: 'table1' | 'table2';
}

export default function RightSidebar({ screenType }: RightSidebarProps): ReactElement {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string): void => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const table1Examples: Example[] = [
    {
      id: '1',
      category: '利用者意向',
      content: '自宅での生活を継続したい',
    },
    {
      id: '2',
      category: '家族意向',
      content: '家族の負担を軽減したい',
    },
    {
      id: '3',
      category: '課題分析',
      content: 'ADLの低下により、日常生活に支障が生じている',
    },
    {
      id: '4',
      category: '支援方針',
      content: 'ADLの維持・改善を図り、在宅生活を継続する',
    },
    {
      id: '5',
      category: '支援内容',
      content: '訪問介護サービスの利用',
    },
  ];

  const table2Examples: Example[] = [
    {
      id: '1',
      category: '利用者意向',
      content: '自宅での生活を継続したい',
    },
    {
      id: '2',
      category: '課題',
      content: 'ADLの低下により、日常生活に支障が生じている',
    },
    {
      id: '3',
      category: '長期目標',
      content: 'ADLの維持・改善を図り、在宅生活を継続する',
    },
    {
      id: '4',
      category: '短期目標',
      content: '3ヶ月以内にADLスコアを2点改善する',
    },
    {
      id: '5',
      category: 'サービス内容',
      content: '訪問介護サービスの利用',
    },
    {
      id: '6',
      category: 'サービス種別',
      content: '訪問介護',
    },
  ];

  const examples = screenType === 'table1' ? table1Examples : table2Examples;

  const categories = Array.from(new Set(examples.map(example => example.category)));

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">例文</h2>
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{category}</span>
                <span className="text-gray-400">
                  {expandedCategories.has(category) ? '−' : '+'}
                </span>
              </div>
            </button>
            {expandedCategories.has(category) && (
              <div className="mt-2 space-y-2">
                {examples
                  .filter(example => example.category === category)
                  .map(example => (
                    <DraggableExample key={example.id} example={example} />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DraggableExample({ example }: { example: Example }): ReactElement {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EXAMPLE',
    item: {
      category: example.category,
      content: example.content,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 bg-white border border-gray-200 rounded-md cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p className="text-sm text-gray-700">{example.content}</p>
    </div>
  );
}