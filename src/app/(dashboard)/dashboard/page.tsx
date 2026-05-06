import React from 'react';
import TopCards from '@/components/dashboard/TopCards';
import CustomerTable from '@/components/dashboard/CustomerTable';

export default function DashboardPage() {
  return (
    <div>
      <TopCards />
      <CustomerTable />
    </div>
  );
}
