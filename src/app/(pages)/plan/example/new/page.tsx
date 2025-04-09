'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

interface ExampleFormData {
  title: string;
  content: string;
  category: string;
}

export default function NewExamplePage(): ReactElement {
  const router = useRouter();
  const [formData, setFormData] = useState<ExampleFormData>({
    title: '',
    content: '',
    category: '意向'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ここで文例を保存する処理を実装
    console.log('保存する文例:', formData);
    router.push('/plan');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-emerald-800 mb-8">新規文例の追加</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="block font-semibold text-emerald-800">
              タイトル
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-emerald-700 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
              placeholder="文例のタイトルを入力してください"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block font-semibold text-emerald-800">
              カテゴリ
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-emerald-700 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
              required
            >
              <option value="意向">意向</option>
              <option value="方針">方針</option>
              <option value="目標">目標</option>
              <option value="分析">分析</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block font-semibold text-emerald-800">
              内容
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-emerald-200 rounded-lg px-4 py-3 text-emerald-700 focus:ring-2 focus:ring-emerald-200 focus:outline-none min-h-[200px] resize-y"
              placeholder="文例の内容を入力してください"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/plan')}
              className="px-6 py-2 border border-emerald-200 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors duration-200"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 