'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import CarePlanHeader from '@/components/CarePlanHeader';
import CarePlanForm from '@/components/CarePlanForm';
import RightSidebar from '@/components/RightSidebar';
import CarePlanTable2 from '@/components/CarePlanTable2';

export default function PlanPage(): ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <CarePlanHeader />
      <div className="container mx-auto px-4 py-8">
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'pr-[320px]' : ''}`}>
          <CarePlanForm />
        </div>
      </div>
      <main className={`flex-1 p-8 ${isSidebarOpen ? 'pr-[320px]' : 'pr-0'} transition-all duration-300`}>
        <CarePlanTable2 />
      </main>
      <RightSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} screenType="table2" />
    </div>
  );
} 