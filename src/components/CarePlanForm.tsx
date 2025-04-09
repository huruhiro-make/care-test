'use client';

import { useState, useRef } from 'react';
import type { ReactElement } from 'react';
import { useDrop } from 'react-dnd';
import CarePlanTable2 from './CarePlanTable2';
import RightSidebar from './RightSidebar';

interface FormData {
  careLevel: string;
  otherReason: string;
  approver: string;
  approvalDate: string;
  approvalComment: string;
  clientIntention: string;
  familyIntention: string;
  supportPolicy: string;
  supportDetails: { id: number; content: string }[];
  issueAnalysis: string;
  userIntention: string;
  supportContent: string;
}

interface Example {
  id: number;
  title: string;
  content: string;
  category: string;
}

interface DropZoneProps {
  onDrop: (content: string) => void;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DropZone = ({ onDrop, label, value, onChange }: DropZoneProps): ReactElement => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EXAMPLE',
    drop: (item: { example: { content: string } }) => {
      onDrop(item.example.content);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-emerald-700">{label}</h3>
      <div
        ref={drop as any}
        className={`relative rounded-lg border-2 border-dashed p-4 transition-colors duration-200 ${
          isOver ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-200'
        }`}
      >
        <textarea
          value={value}
          onChange={onChange}
          className="w-full h-32 p-3 text-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          placeholder={`${label}を入力してください`}
        />
        {isOver && (
          <div className="absolute inset-0 bg-emerald-50 bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-sm text-emerald-600">ここにドロップして追加</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CarePlanForm(): ReactElement {
  const [activeTab, setActiveTab] = useState<'第1表' | '第2表' | '第3表'>('第1表');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    careLevel: '要介護1',
    otherReason: '高齢者世帯のため',
    approver: '',
    approvalDate: '',
    approvalComment: '',
    clientIntention: '物との家にいられればと思います',
    familyIntention: '娘がときどきに入れる範囲であったらと思います',
    supportPolicy: 'これからも住み慣れた自宅で、安心して在宅生活を継続できるように、下記の点に注意しながら支援させていただきます。',
    supportDetails: [
      { id: 1, content: '身体機能の維持に努めています。トイレに行く、体を起こして食事をする、掃除を受け入れながら歩行を行うなど生活動作を取り入れた在宅生活が送れるよう指導していきます。' }
    ],
    issueAnalysis: '',
    userIntention: '',
    supportContent: '',
  });

  const [{ isOver: isOverClient }, dropClient] = useDrop(() => ({
    accept: 'EXAMPLE',
    drop: (item: { example: Example }) => {
      if (item.example.category === '意向') {
        setFormData(prev => ({
          ...prev,
          clientIntention: item.example.content
        }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverFamily }, dropFamily] = useDrop(() => ({
    accept: 'EXAMPLE',
    drop: (item: { example: Example }) => {
      if (item.example.category === '意向') {
        setFormData(prev => ({
          ...prev,
          familyIntention: item.example.content
        }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverSupportPolicy }, dropSupportPolicy] = useDrop(() => ({
    accept: 'EXAMPLE',
    drop: (item: { example: { category: string; content: string } }) => {
      if (item.example.category === '援助方針') {
        setFormData(prev => ({
          ...prev,
          supportPolicy: item.example.content
        }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverAnalysis }, dropAnalysis] = useDrop(() => ({
    accept: 'EXAMPLE',
    drop: (item: { example: Example }) => {
      if (item.example.category === '分析') {
        setFormData(prev => ({
          ...prev,
          issueAnalysis: item.example.content
        }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOverDrop }, dropIssueAnalysis] = useDrop(() => ({
    accept: 'EXAMPLE',
    drop: (item: { example: { category: string; content: string } }) => {
      if (item.example.category === '分析の結果') {
        const newContent = formData.issueAnalysis
          ? `${formData.issueAnalysis}\n${item.example.content}`
          : item.example.content;
        setFormData({
          ...formData,
          issueAnalysis: newContent
        });
      }
    },
    collect: (monitor) => ({
      isOverDrop: monitor.isOver()
    })
  }));

  const [isOver, setIsOver] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    
    if (name === 'supportDetails' && typeof index === 'number') {
      const newDetails = [...formData.supportDetails];
      newDetails[index].content = value;
      setFormData(prev => ({
        ...prev,
        supportDetails: newDetails
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addSupportDetail = () => {
    setFormData(prev => ({
      ...prev,
      supportDetails: [
        ...prev.supportDetails,
        { id: Date.now(), content: '' }
      ]
    }));
  };

  const removeSupportDetail = (id: number) => {
    setFormData(prev => ({
      ...prev,
      supportDetails: prev.supportDetails.filter(detail => detail.id !== id)
    }));
  };

  const handleDrop = (field: keyof FormData, content: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] ? `${prev[field]}\n${content}` : content
    }));
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case '第1表':
        return (
          <>
            {/* 利用者及び家族の生活に対する意向を踏まえた課題分析の結果 */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-emerald-800">利用者と家族の意向</h2>
              <div className="border border-emerald-200 rounded-lg p-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 space-y-8">
                <div className="space-y-3">
                  <label className="block font-semibold text-emerald-800">本人の意向：</label>
                  <div
                    ref={dropClient as any}
                    className={`space-y-4 ${isOverClient ? 'bg-emerald-50' : ''}`}
                  >
                    <textarea
                      name="clientIntention"
                      value={formData.clientIntention}
                      onChange={handleChange}
                      className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[100px] resize-y"
                      placeholder="本人の意向を入力してください"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block font-semibold text-emerald-800">家族の意向：</label>
                  <div
                    ref={dropFamily as any}
                    className={`space-y-4 ${isOverFamily ? 'bg-emerald-50' : ''}`}
                  >
                    <textarea
                      name="familyIntention"
                      value={formData.familyIntention}
                      onChange={handleChange}
                      className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[100px] resize-y"
                      placeholder="家族の意向を入力してください"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 利用者及び家族の生活に対する意向を踏まえた課題分析の結果セクション */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-emerald-800 mb-4">利用者及び家族の生活に対する意向を踏まえた課題分析の結果</h2>
              <div
                ref={dropIssueAnalysis as any}
                className={`relative border-2 border-dashed rounded-lg p-4 min-h-[200px] transition-all duration-200 ${
                  isOverDrop 
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg transform scale-[1.01]' 
                    : 'border-emerald-200 hover:border-emerald-300'
                }`}
              >
                <textarea
                  name="issueAnalysis"
                  value={formData.issueAnalysis}
                  onChange={handleChange}
                  className="w-full h-full min-h-[200px] p-4 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="課題分析の結果を入力してください..."
                />
                {isOverDrop && (
                  <div className="absolute inset-0 bg-emerald-50 bg-opacity-90 flex items-center justify-center rounded-lg transition-opacity duration-200">
                    <p className="text-emerald-800 font-medium flex items-center gap-2">
                      <span className="text-xl">+</span>
                      ここにドロップして追加
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 総合的な援助の方針 */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-emerald-800">総合的な援助の方針</h2>
              <div className="border border-emerald-200 rounded-lg p-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 space-y-8">
                <div className="space-y-3">
                  <label className="block font-semibold text-emerald-800">方針：</label>
                  <div
                    ref={dropSupportPolicy as any}
                    className={`space-y-4 ${isOverSupportPolicy ? 'bg-emerald-50' : ''}`}
                  >
                    <textarea
                      name="supportPolicy"
                      value={formData.supportPolicy}
                      onChange={handleChange}
                      className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[120px] resize-y"
                      placeholder="総合的な援助の方針を入力してください"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="block font-semibold text-emerald-800">詳細項目：</label>
                  {formData.supportDetails.map((detail, index) => (
                    <div key={detail.id} className="flex gap-3 items-start">
                      <textarea
                        name="supportDetails"
                        value={detail.content}
                        onChange={(e) => handleChange(e, index)}
                        className="flex-1 border border-emerald-200 rounded-lg px-4 py-3 text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[80px] resize-y"
                        placeholder={`詳細項目 ${index + 1}`}
                      />
                      <button
                        onClick={() => removeSupportDetail(detail.id)}
                        className="text-red-600 hover:text-red-700 px-3 py-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                        title="削除"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSupportDetail}
                    className="text-emerald-800 hover:text-emerald-900 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                  >
                    <span className="text-xl">＋</span> 項目を追加
                  </button>
                </div>
              </div>
            </section>

            {/* 生活援助中心型の算定理由 */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-emerald-800">生活援助中心型の算定理由</h2>
              <div className="flex space-x-4">
                <select className="border border-emerald-200 rounded px-3 py-2 bg-white text-emerald-800 shadow-sm hover:shadow transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:outline-none w-48">
                  <option>その他</option>
                  <option>独居</option>
                  <option>高齢者のみ世帯</option>
                  <option>日中独居</option>
                </select>
                <input 
                  type="text"
                  name="otherReason"
                  value={formData.otherReason}
                  onChange={handleChange}
                  className="border border-emerald-200 rounded px-3 py-2 flex-grow bg-white text-emerald-800 shadow-sm hover:shadow transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="その他の理由を入力"
                />
              </div>
            </section>

            {/* 承認者情報 */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-emerald-800">承認情報</h2>
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="block font-semibold text-emerald-800">承認者</label>
                  <select
                    name="approver"
                    value={formData.approver}
                    onChange={handleChange}
                    className="border border-emerald-200 rounded px-3 py-2 w-full bg-white text-emerald-800 shadow-sm hover:shadow transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">選択してください</option>
                    <option value="山田太郎">山田太郎</option>
                    <option value="鈴木花子">鈴木花子</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block font-semibold text-emerald-800">承認日</label>
                  <input
                    type="date"
                    name="approvalDate"
                    value={formData.approvalDate}
                    onChange={handleChange}
                    className="border border-emerald-200 rounded px-3 py-2 w-full bg-white text-emerald-800 shadow-sm hover:shadow transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block font-semibold text-emerald-800">承認コメント</label>
                  <input
                    type="text"
                    name="approvalComment"
                    value={formData.approvalComment}
                    onChange={handleChange}
                    className="border border-emerald-200 rounded px-3 py-2 w-full bg-white text-emerald-800 shadow-sm hover:shadow transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="承認コメントを入力"
                  />
                </div>
              </div>
            </section>
          </>
        );
      case '第2表':
        return <CarePlanTable2 />;
      case '第3表':
        return <div>第3表の内容（準備中）</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-[1600px] mx-auto my-8 min-w-[1200px]">
      <div className="p-8 space-y-8">
        {/* ナビゲーションバー */}
        <div className="border-b border-emerald-200">
          <nav className="flex space-x-8">
            {(['第1表', '第2表', '第3表'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-emerald-800 text-emerald-800'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {renderContent()}
      </div>

      <RightSidebar screenType="table2" isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
    </div>
  );
} 