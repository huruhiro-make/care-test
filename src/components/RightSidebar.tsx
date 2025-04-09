'use client';

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useDrag } from 'react-dnd';
import Link from 'next/link';

interface Example {
  id: number;
  category: string;
  content: string;
}

interface DraggableExampleProps {
  example: Example;
}

function DraggableExample({ example }: DraggableExampleProps): ReactElement {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EXAMPLE',
    item: () => {
      const target = document.querySelector('[data-row-id]') as HTMLElement;
      const rowId = target ? parseInt(target.dataset.rowId || '0') : 0;
      return { 
        example,
        rowId
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      className={`p-4 border border-emerald-100 rounded-lg cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {example.content}
    </div>
  );
}

interface RightSidebarProps {
  screenType: 'table1' | 'table2';
  isOpen: boolean;
  onToggle: () => void;
}

export default function RightSidebar({ screenType, isOpen, onToggle }: RightSidebarProps): ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onToggle();
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsExamplesOpen(true);
  };

  const handleCloseExamples = () => {
    setIsExamplesOpen(false);
    setSelectedCategory(null);
  };

  const table1Examples = [
    {
      id: 1,
      category: '利用者の意向',
      content: '自宅での生活を継続したい。家族の負担をかけずに、できることは自分で行いたい。'
    },
    {
      id: 2,
      category: '家族の意向',
      content: '仕事の合間を見て支援を行いたい。週末は家族で過ごす時間を確保したい。'
    },
    {
      id: 3,
      category: '課題分析の結果',
      content: '本人の自宅生活継続の意向と、家族の支援時間の制約により、効率的な支援体制の構築が必要。'
    },
    {
      id: 4,
      category: '総合的な援助の方針',
      content: '本人の自己決定を尊重しながら、安全な生活が送れるよう支援を行う。家族の負担軽減と本人の自立支援の両立を図る。'
    }
  ];

  const table2Examples = [
    {
      id: 1,
      category: '意向',
      content: 'これまで通り介護サービスを利用し、活気ある生活を送って元気に過ごしたい。'
    },
    {
      id: 2,
      category: '意向',
      content: '介護サービスによる援助を受け、安心して在宅生活を続けたい。'
    },
    {
      id: 3,
      category: '意向',
      content: '不安な面はあるが、今のまま在宅での生活を続けて行きたい。'
    },
    {
      id: 4,
      category: '意向',
      content: '夫婦一緒に生活できると安心する。これからも仲良く助け合いながら自宅で暮らしたい。'
    },
    {
      id: 5,
      category: '意向',
      content: '自分の体調に合わせて、無理のない範囲で自分のできることをこれからも続けたい。'
    },
    {
      id: 6,
      category: '解決すべき課題',
      content: '歩行時のふらつきがあり、転倒のリスクが高い。安全な歩行方法の習得が必要。'
    },
    {
      id: 7,
      category: '解決すべき課題',
      content: '食事の準備が困難で、栄養バランスの取れた食事が摂れていない。'
    },
    {
      id: 8,
      category: '解決すべき課題',
      content: '夜間のトイレでの転倒リスクが高い。適切な照明と手すりの設置が必要。'
    },
    {
      id: 9,
      category: '解決すべき課題',
      content: '服薬管理が不確実で、飲み忘れがある。服薬管理の支援が必要。'
    },
    {
      id: 10,
      category: '解決すべき課題',
      content: '外出機会が減少し、社会との接点が少なくなっている。'
    },
    {
      id: 11,
      category: '援助方針',
      content: '本人の自己決定を尊重しながら、安全な生活が送れるよう支援を行う。家族の負担軽減と本人の自立支援の両立を図る。'
    },
    {
      id: 12,
      category: '援助方針',
      content: '専門職の意見を取り入れながら、段階的な支援を実施する。本人の意欲を尊重し、安全な生活が送れるよう支援を行う。'
    },
    {
      id: 13,
      category: '援助方針',
      content: '生活リズムを整え、日中の活動を促すことで、夜間の睡眠の質を改善する。'
    },
    {
      id: 14,
      category: '援助方針',
      content: '家族の負担を考慮しながら、本人の自立を支援する。必要に応じて介護サービスを活用する。'
    },
    {
      id: 15,
      category: '援助方針',
      content: '本人の残存機能を活かしながら、安全な生活が送れるよう支援を行う。'
    },
    {
      id: 16,
      category: '長期目標',
      content: '適切な通院と服薬ができ安定した生活ができる'
    },
    {
      id: 17,
      category: '長期目標',
      content: '外出する機会を持って活動的な生活ができる'
    },
    {
      id: 18,
      category: '長期目標',
      content: '動かなくならないかもという不安なく生活できる'
    },
    {
      id: 19,
      category: '長期目標',
      content: '栄養バランスの取れた食事を摂り、健康な生活が送れる'
    },
    {
      id: 20,
      category: '長期目標',
      content: '家族との関係を保ちながら、自立した生活が送れる'
    },
    {
      id: 21,
      category: '短期目標',
      content: '定期的な受診と服薬の指示通りの内服ができる'
    },
    {
      id: 22,
      category: '短期目標',
      content: '週1回以上安全に外出できる'
    },
    {
      id: 23,
      category: '短期目標',
      content: '専門職の意見の運動ができる'
    },
    {
      id: 24,
      category: '短期目標',
      content: '1日3食、栄養バランスの取れた食事を摂れる'
    },
    {
      id: 25,
      category: '短期目標',
      content: '夜間のトイレでの転倒を防ぐため、適切な照明と手すりを使用できる'
    },
    {
      id: 26,
      category: 'サービス内容',
      content: '・訪問介護（身体介護）\n・通所介護（生活支援）\n・福祉用具貸与（手すり、ポータブルトイレ）'
    },
    {
      id: 27,
      category: 'サービス内容',
      content: '・通所介護（生活支援、機能訓練）\n・訪問介護（生活支援）\n・福祉用具貸与（歩行器）'
    },
    {
      id: 28,
      category: 'サービス内容',
      content: '・通所リハビリ（理学療法）\n・訪問リハビリ（理学療法）\n・福祉用具貸与（膝装具）'
    },
    {
      id: 29,
      category: 'サービス内容',
      content: '・訪問看護（服薬管理、バイタルチェック）\n・訪問介護（生活支援）\n・福祉用具貸与（特殊寝台）'
    },
    {
      id: 30,
      category: 'サービス内容',
      content: '・通所介護（生活支援、機能訓練）\n・訪問介護（身体介護）\n・福祉用具貸与（車いす）'
    },
    {
      id: 31,
      category: '分析の結果',
      content: '本人の自宅生活継続の意向が強く、家族の支援体制も整っているが、ADLの低下により転倒リスクが高まっている。'
    },
    {
      id: 32,
      category: '分析の結果',
      content: '認知機能の低下により服薬管理が困難になっているが、介護サービスの利用により生活リズムは保たれている。'
    },
    {
      id: 33,
      category: '分析の結果',
      content: '家族の支援により基本的な生活は維持できているが、社会参加の機会が減少しており、活動性の低下が懸念される。'
    },
    {
      id: 34,
      category: '分析の結果',
      content: '自立心が強く、できる限り自分でやりたいという意欲があるが、過度な負担により体調を崩すリスクがある。'
    },
    {
      id: 35,
      category: '分析の結果',
      content: '食事の準備や掃除などの家事動作に支障があり、生活環境の維持が困難になってきている。'
    }
  ];

  const examples = screenType === 'table1' ? table1Examples : table2Examples;
  const categories = screenType === 'table1' 
    ? ['利用者の意向', '家族の意向', '課題分析の結果', '総合的な援助の方針']
    : ['意向', '分析の結果', '援助方針', '解決すべき課題', '長期目標', '短期目標', 'サービス内容'];

  const filteredExamples = selectedCategory 
    ? examples.filter(example => example.category === selectedCategory)
    : [];

  return (
    <>
      {/* 開くボタン */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white px-4 py-2 rounded-l-lg shadow-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2"
        >
          <span>開く</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      {/* カテゴリーサイドバー */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-emerald-200">
            <h2 className="text-lg font-semibold text-emerald-800">カテゴリー</h2>
            <button
              onClick={onToggle}
              className="text-emerald-800 hover:text-emerald-900 transition-colors duration-200"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="bg-white border border-emerald-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  <h3 className="text-emerald-800 font-medium">{category}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 例文サイドバー */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${isExamplesOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-emerald-800">{selectedCategory}の例文</h2>
            <button
              onClick={handleCloseExamples}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">×</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {selectedCategory && examples
                .filter(example => example.category === selectedCategory)
                .map((example) => (
                  <DraggableExample
                    key={example.id}
                    example={example}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}