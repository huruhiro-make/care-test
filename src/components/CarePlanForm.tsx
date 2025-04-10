'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { useDrop } from 'react-dnd';

interface FormData {
  userIntention: string;
  familyIntention: string;
  issueAnalysis: string;
  supportPolicy: string;
  supportContent: string;
}

interface DropItem {
  category: string;
  content: string;
}

export default function CarePlanForm(): ReactElement {
  const [formData, setFormData] = useState<FormData>({
    userIntention: '',
    familyIntention: '',
    issueAnalysis: '',
    supportPolicy: '',
    supportContent: '',
  });

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [{ isOver }, drop] = useDrop<DropItem, void, { isOver: boolean }>(() => ({
    accept: 'EXAMPLE',
    drop: (item) => {
      const categoryMap: Record<string, keyof FormData> = {
        '利用者意向': 'userIntention',
        '家族意向': 'familyIntention',
        '課題分析': 'issueAnalysis',
        '支援方針': 'supportPolicy',
        '支援内容': 'supportContent',
      };

      const field = categoryMap[item.category];
      if (field) {
        setFormData((prev) => ({
          ...prev,
          [field]: prev[field] ? `${prev[field]}\n${item.content}` : item.content,
        }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="space-y-6">
      <div
        ref={drop as unknown as React.RefObject<HTMLDivElement>}
        className={`p-4 border-2 border-dashed rounded-lg ${
          isOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
        }`}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="userIntention" className="block text-sm font-medium text-gray-700">
              利用者意向
            </label>
            <textarea
              id="userIntention"
              value={formData.userIntention}
              onChange={(e) => handleChange('userIntention', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="familyIntention" className="block text-sm font-medium text-gray-700">
              家族意向
            </label>
            <textarea
              id="familyIntention"
              value={formData.familyIntention}
              onChange={(e) => handleChange('familyIntention', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="issueAnalysis" className="block text-sm font-medium text-gray-700">
              課題分析
            </label>
            <textarea
              id="issueAnalysis"
              value={formData.issueAnalysis}
              onChange={(e) => handleChange('issueAnalysis', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="supportPolicy" className="block text-sm font-medium text-gray-700">
              支援方針
            </label>
            <textarea
              id="supportPolicy"
              value={formData.supportPolicy}
              onChange={(e) => handleChange('supportPolicy', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="supportContent" className="block text-sm font-medium text-gray-700">
              支援内容
            </label>
            <textarea
              id="supportContent"
              value={formData.supportContent}
              onChange={(e) => handleChange('supportContent', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 