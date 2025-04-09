'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { useDrop } from 'react-dnd';

interface TableRow {
  id: number;
  needs: string;
  longTermGoal: {
    content: string;
    period: {
      start: string;
      end: string;
    };
  };
  shortTermGoal: {
    content: string;
    period: {
      start: string;
      end: string;
    };
  };
  serviceContent: string;
  serviceType: string;
}

type GoalField = 'longTermGoal' | 'shortTermGoal';

export default function CarePlanTable2(): ReactElement {
  const [rows, setRows] = useState<TableRow[]>([
    {
      id: 1,
      needs: '住み慣れた所で不安なく生活したい',
      longTermGoal: {
        content: '適切な通院と服薬ができ安定した生活ができる',
        period: {
          start: '令07/04/01',
          end: '令08/03/31'
        }
      },
      shortTermGoal: {
        content: '定期的な受診と服薬の指示通りの内服ができる',
        period: {
          start: '令07/04/01',
          end: '令07/10/31'
        }
      },
      serviceContent: '・訪問介護（身体介護）\n・通所介護（生活支援）\n・福祉用具貸与（手すり、ポータブルトイレ）',
      serviceType: '居宅サービス'
    },
    {
      id: 2,
      needs: 'ずっと一人で家にいると寂しいので、外出の機会を持ち、明るい気持ちで生活したい',
      longTermGoal: {
        content: '外出する機会を持って活動的な生活ができる',
        period: {
          start: '令07/04/01',
          end: '令08/03/31'
        }
      },
      shortTermGoal: {
        content: '週1回以上安全に外出できる',
        period: {
          start: '令07/04/01',
          end: '令07/10/31'
        }
      },
      serviceContent: '・通所介護（生活支援、機能訓練）\n・訪問介護（生活支援）\n・福祉用具貸与（歩行器）',
      serviceType: '居宅サービス'
    },
    {
      id: 3,
      needs: '膝が痛くてどうしても活動不足になる。動けなくならないように運動したい',
      longTermGoal: {
        content: '動かなくならないかもという不安なく生活できる',
        period: {
          start: '令07/04/01',
          end: '令08/03/31'
        }
      },
      shortTermGoal: {
        content: '専門職の意見の運動ができる',
        period: {
          start: '令07/04/01',
          end: '令07/10/31'
        }
      },
      serviceContent: '・通所リハビリ（理学療法）\n・訪問リハビリ（理学療法）\n・福祉用具貸与（膝装具）',
      serviceType: '居宅サービス'
    }
  ]);

  const addRow = () => {
    setRows(prev => {
      const maxId = Math.max(...prev.map(row => row.id));
      return [...prev, {
        id: maxId + 1,
        needs: '',
        longTermGoal: {
          content: '',
          period: {
            start: '',
            end: ''
          }
        },
        shortTermGoal: {
          content: '',
          period: {
            start: '',
            end: ''
          }
        },
        serviceContent: '',
        serviceType: '居宅サービス'
      }];
    });
  };

  const removeRow = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  const handleChange = (
    id: number,
    field: 'needs' | GoalField | 'serviceContent' | 'serviceType',
    subField: 'content' | 'period',
    value: string | { start: string; end: string }
  ) => {
    setRows(prev => prev.map(row => {
      if (row.id !== id) return row;
      
      if (field === 'serviceContent' || field === 'serviceType') {
        return {
          ...row,
          [field]: value as string
        };
      }

      if (field === 'needs') {
        return {
          ...row,
          needs: value as string
        };
      }
      
      const goalField = field as GoalField;
      if (subField === 'content') {
        return {
          ...row,
          [goalField]: {
            ...row[goalField],
            content: value as string
          }
        };
      } else {
        return {
          ...row,
          [goalField]: {
            ...row[goalField],
            period: value as { start: string; end: string }
          }
        };
      }
    }));
  };

  const createDropTarget = (rowId: number) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'EXAMPLE',
      drop: (item: { example: { category: string; content: string } }) => {
        if (item.example.category === '解決すべき課題') {
          const targetRow = rows.find(r => r.id === rowId);
          if (targetRow) {
            const newContent = targetRow.needs
              ? `${targetRow.needs}\n${item.example.content}`
              : item.example.content;
            handleChange(rowId, 'needs', 'content', newContent);
          }
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }), []);

    return { isOver, drop };
  };

  return (
    <div id="table2" className="max-w-[1600px] mx-auto min-w-[1200px] overflow-x-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-8 space-y-8">
          <div className="border-b border-emerald-200">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">第2表</h2>
          </div>

          {/* テーブルヘッダー */}
          <div className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_80px] gap-4 mb-4">
            <div className="font-semibold text-emerald-800">No</div>
            <div className="font-semibold text-emerald-800">解決すべき課題</div>
            <div>
              <div className="font-semibold text-emerald-800 mb-2">長期目標</div>
              <div className="text-sm text-gray-600">期間</div>
            </div>
            <div>
              <div className="font-semibold text-emerald-800 mb-2">短期目標</div>
              <div className="text-sm text-gray-600">期間</div>
            </div>
            <div className="font-semibold text-emerald-800">サービス内容</div>
            <div className="font-semibold text-emerald-800">サービス種別</div>
            <div className="font-semibold text-emerald-800">編集</div>
          </div>

          {/* テーブル行 */}
          {rows.map((row, index) => {
            const { isOver, drop } = createDropTarget(row.id);
            
            return (
              <div key={row.id} className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_80px] gap-4 mb-4">
                <div className="flex items-center justify-center text-gray-600">{index + 1}</div>
                
                <div 
                  ref={drop as any}
                  className={`relative space-y-2 ${isOver ? 'bg-emerald-50' : ''}`}
                >
                  <textarea
                    value={row.needs}
                    onChange={(e) => handleChange(row.id, 'needs', 'content', e.target.value)}
                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[100px] ${
                      isOver ? 'border-emerald-500' : 'border-emerald-200'
                    }`}
                  />
                  {isOver && (
                    <div className="absolute inset-0 bg-emerald-50 bg-opacity-90 flex items-center justify-center rounded transition-opacity duration-200">
                      <p className="text-emerald-800 font-medium flex items-center gap-2">
                        <span className="text-xl">+</span>
                        ここにドロップして追加
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <textarea
                    value={row.longTermGoal.content}
                    onChange={(e) => handleChange(row.id, 'longTermGoal', 'content', e.target.value)}
                    className="w-full p-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[100px]"
                  />
                  <div className="flex gap-2 items-center text-sm">
                    <input
                      type="text"
                      value={row.longTermGoal.period.start}
                      onChange={(e) => handleChange(row.id, 'longTermGoal', 'period', { 
                        ...row.longTermGoal.period,
                        start: e.target.value 
                      })}
                      className="w-full p-1 border border-emerald-200 rounded text-center"
                    />
                    <span>～</span>
                    <input
                      type="text"
                      value={row.longTermGoal.period.end}
                      onChange={(e) => handleChange(row.id, 'longTermGoal', 'period', {
                        ...row.longTermGoal.period,
                        end: e.target.value
                      })}
                      className="w-full p-1 border border-emerald-200 rounded text-center"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea
                    value={row.shortTermGoal.content}
                    onChange={(e) => handleChange(row.id, 'shortTermGoal', 'content', e.target.value)}
                    className="w-full p-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[100px]"
                  />
                  <div className="flex gap-2 items-center text-sm">
                    <input
                      type="text"
                      value={row.shortTermGoal.period.start}
                      onChange={(e) => handleChange(row.id, 'shortTermGoal', 'period', {
                        ...row.shortTermGoal.period,
                        start: e.target.value
                      })}
                      className="w-full p-1 border border-emerald-200 rounded text-center"
                    />
                    <span>～</span>
                    <input
                      type="text"
                      value={row.shortTermGoal.period.end}
                      onChange={(e) => handleChange(row.id, 'shortTermGoal', 'period', {
                        ...row.shortTermGoal.period,
                        end: e.target.value
                      })}
                      className="w-full p-1 border border-emerald-200 rounded text-center"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea
                    value={row.serviceContent}
                    onChange={(e) => handleChange(row.id, 'serviceContent', 'content', e.target.value)}
                    className="w-full p-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <textarea
                    value={row.serviceType}
                    onChange={(e) => handleChange(row.id, 'serviceType', 'content', e.target.value)}
                    className="w-full p-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none min-h-[100px]"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => removeRow(row.id)}
                    className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          {/* 行追加ボタン */}
          <div className="flex justify-center mt-4">
            <button
              onClick={addRow}
              className="text-emerald-800 hover:text-emerald-900 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
            >
              <span className="text-xl">＋</span> 行を追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 