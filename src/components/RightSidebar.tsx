'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { useDrag } from 'react-dnd';

interface Example {
  id: number;
  category: string;
  content: string;
}

interface RightSidebarProps {
  screenType: 'table1' | 'table2';
}

export default function RightSidebar({ screenType }: RightSidebarProps): ReactElement {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const table1Examples: Example[] = [
    {
      id: 1,
      category: '利用者意向',
      content: '自宅での生活を継続したい',
    },
    {
      id: 2,
      category: '家族意向',
      content: '家族の負担を軽減したい',
    },
    {
      id: 3,
      category: '課題分析',
      content: 'ADLの低下により、日常生活に支障が出ている',
    },
    {
      id: 4,
      category: '支援方針',
      content: 'ADLの維持・改善を図り、自宅での生活を継続できるように支援する',
    },
    {
      id: 5,
      category: '支援内容',
      content: '理学療法士による運動機能の評価と訓練',
    },
  ];

  const table2Examples: Example[] = [
    {
      id: 1,
      category: '利用者意向',
      content: '自宅での生活を継続したい',
    },
    {
      id: 2,
      category: '課題分析',
      content: 'ADLの低下により、日常生活に支障が出ている',
    },
    {
      id: 3,
      category: '長期目標',
      content: '3ヶ月以内にADLを改善し、自宅での生活を継続できるようになる',
    },
    {
      id: 4,
      category: '短期目標',
      content: '1ヶ月以内に基本的なADLを自立できるようになる',
    },
    {
      id: 5,
      category: 'サービス内容',
      content: '理学療法士による運動機能の評価と訓練',
    },
    {
      id: 6,
      category: 'サービス種別',
      content: '訪問リハビリテーション',
    },
  ];

  const examples = screenType === 'table1' ? table1Examples : table2Examples;

  const toggleCategory = (category: string): void => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const DraggableExample = ({ example }: { example: Example }): ReactElement => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'EXAMPLE',
      item: { category: example.category, content: example.content },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag as unknown as React.RefObject<HTMLDivElement>}
        className={`p-2 mb-2 rounded cursor-move ${
          isDragging ? 'bg-emerald-100' : 'bg-white hover:bg-gray-50'
        }`}
      >
        {example.content}
      </div>
    );
  };

  return (
    <div className="w-64 bg-gray-50 p-4 border-l">
      <h2 className="text-lg font-semibold mb-4">例文</h2>
      <div className="space-y-4">
        {Array.from(new Set(examples.map((e) => e.category))).map((category) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="w-full text-left font-medium text-gray-700 hover:text-emerald-600"
            >
              {category}
            </button>
            {expandedCategories.has(category) && (
              <div className="mt-2 pl-2">
                {examples
                  .filter((e) => e.category === category)
                  .map((example) => (
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