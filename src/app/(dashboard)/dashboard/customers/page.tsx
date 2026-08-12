'use client';

import { useState } from "react";
import CustomerTable from "@/components/dashboard/Customer/CustomerTable";
import AddCustomerModal from "@/components/dashboard/Customer/AddCustomerModal";

export default function CustomersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerListVersion, setCustomerListVersion] = useState(0);
  const [customerStatsVersion, setCustomerStatsVersion] = useState(0);

  const openAddCustomerForm = () => setIsModalOpen(true);
  const refreshCustomerStats = () => {
    setCustomerStatsVersion((version) => version + 1);
  };

  return (
    <div className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      {/* Heading row with Add Customer button inline - single row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <h1 className="text-[26px] sm:text-[28px] font-bold leading-tight text-[#002B73]">
          Customer Management
        </h1>
      </div>

      <div className="flex justify-end pb-3 pt-2">
        <button
          type="button"
          onClick={openAddCustomerForm}
          className="whitespace-nowrap flex-shrink-0 rounded-lg bg-[#b91c1c] px-5 py-2.5 text-sm sm:text-[15px] font-bold text-white shadow-sm hover:bg-[#991b1b] transition-colors"
        >
          + Add Customer
        </button>
      </div>

      <CustomerTable
        key={`customer-table-${customerListVersion}`}
        onCustomersChanged={refreshCustomerStats}
      />

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
