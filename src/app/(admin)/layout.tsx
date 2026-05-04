import type { ReactNode } from 'react';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
