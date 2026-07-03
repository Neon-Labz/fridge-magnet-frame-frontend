'use client';

import { useState } from 'react';
import TopCards from '@/components/dashboard/TopCards';
import CustomerTable from '@/components/dashboard/Customer/CustomerTable';
import AddCustomerModal from '@/components/dashboard/Customer/AddCustomerModal';

export default function CustomersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerListVersion, setCustomerListVersion] = useState(0);
  const [customerStatsVersion, setCustomerStatsVersion] = useState(0);

  const openAddCustomerForm = () => setIsModalOpen(true);
  const refreshCustomerStats = () => {
    setCustomerStatsVersion((version) => version + 1);
  };

  return (
    <div className="h-full w-full overflow-y-auto px-6 py-5 sm:px-8">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-bold leading-tight text-[#002B73]">
            Customer Management
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Oversee and track all customer interactions and delivery status.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddCustomerForm}
          className="rounded-md bg-[#b91c1c] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#991b1b]"
        >
          + Add Customer
        </button>
      </div>

      <TopCards
        key={`customer-stats-${customerStatsVersion}`}
        onAddCustomer={openAddCustomerForm}
      />

      <div>
        <CustomerTable
          key={`customer-table-${customerListVersion}`}
          onCustomersChanged={refreshCustomerStats}
        />
      </div>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          setCustomerListVersion((version) => version + 1);
          refreshCustomerStats();
        }}
      />
    </div>
  );
}
