'use client';

import type { ReactElement } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DndWrapperProps {
  children: React.ReactNode;
}

export default function DndWrapper({ children }: DndWrapperProps): ReactElement {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  );
} 