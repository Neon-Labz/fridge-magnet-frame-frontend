"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import AddCustomerModal from "./AddCustomerModal";

type CustomerRow = {
  id: string;
  recordId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  initials: string;
  isActive: boolean;
  source?: string;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const normalizeCustomer = (customer: any): CustomerRow => {
  const name =
    customer.customerName ||
    customer.name ||
    `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim() ||
    "Unknown";

  return {
    id: String(
      customer.customerId ||
        customer.id ||
        customer._id ||
        customer.recordId ||
        "",
    ),
    recordId: String(customer._id || customer.recordId || customer.id || ""),
    name,
    email: customer.emailAddress || customer.email || "Not provided",
    phone: customer.phoneNumber || customer.phone || "Not provided",
    address: customer.customerAddress || customer.address || "Not provided",
    initials: getInitials(name),
    isActive: customer.isActive ?? customer.status !== "inactive",
    source: customer.source,
  };
};

const extractCustomers = (data: any): any[] => {
  if (Array.isArray(data?.data?.customers)) {
    return data.data.customers;
  }

  if (Array.isArray(data?.data?.items)) {
    return data.data.items;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.customers)) {
    return data.customers;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

type CustomerTableProps = {
  onCustomersChanged?: () => void;
};

const CustomerTable = ({ onCustomersChanged }: CustomerTableProps) => {
  const {
    customers,
    stats,
    loading,
    error,
    page,
    total,
    totalPages,
    limit,
    goToPage,
    refresh,
  } = useCustomers();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState<CustomerRow | null>(
    null,
  );

  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  const [statusError, setStatusError] = useState<string | null>(null);

  const [showFilter, setShowFilter] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "Enable" | "Disable"
  >("all");

  const [allCustomers, setAllCustomers] = useState<CustomerRow[]>([]);

  const [allCustomersLoading, setAllCustomersLoading] = useState(false);

  const currentPageCustomers = useMemo(
    () => customers.map((customer: any) => normalizeCustomer(customer)),
    [customers],
  );

  const fetchAllCustomers = async () => {
    setAllCustomersLoading(true);

    try {
      const res = await fetch("/api/v1/customers?page=1&limit=10000");

      if (!res.ok) {
        throw new Error("Unable to load all customers");
      }

      const data = await res.json();

      const list = extractCustomers(data).map(normalizeCustomer);

      setAllCustomers(list);
    } catch {
      setAllCustomers(currentPageCustomers);
    } finally {
      setAllCustomersLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [total, customers.length]);

  const isFiltering = searchText.trim() !== "" || statusFilter !== "all";

  const filterCustomers = (list: CustomerRow[]) => {
    const keyword = searchText.trim().toLowerCase();

    return list.filter((customer) => {
      const matchesSearch =
        keyword === "" ||
        String(customer.id ?? "")
          .toLowerCase()
          .includes(keyword) ||
        String(customer.name ?? "")
          .toLowerCase()
          .includes(keyword) ||
        String(customer.email ?? "")
          .toLowerCase()
          .includes(keyword) ||
        String(customer.phone ?? "")
          .toLowerCase()
          .includes(keyword) ||
        String(customer.address ?? "")
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "Enable" && customer.isActive) ||
        (statusFilter === "Disable" && !customer.isActive);

      return matchesSearch && matchesStatus;
    });
  };

  const filteredAllCustomers = useMemo(() => {
    const source =
      allCustomers.length > 0 ? allCustomers : currentPageCustomers;

    return filterCustomers(source);
  }, [allCustomers, currentPageCustomers, searchText, statusFilter]);

  const tableCustomers = isFiltering
    ? filteredAllCustomers
    : currentPageCustomers;

  const escapeCsv = (value: unknown) => {
    const text = String(value ?? "");

    return `"${text.replace(/"/g, '""')}"`;
  };

  const downloadCustomers = filteredAllCustomers;

  const handleDownload = async () => {
    if (allCustomers.length === 0) {
      await fetchAllCustomers();
    }

    const rowsToDownload =
      downloadCustomers.length > 0
        ? downloadCustomers
        : allCustomers.length > 0
          ? filterCustomers(allCustomers)
          : filterCustomers(currentPageCustomers);

    if (rowsToDownload.length === 0) {
      return;
    }

    const header = [
      "Customer ID",
      "Customer Name",
      "Email Address",
      "Phone Number",
      "Customer Address",
      "Status",
    ];

    const rows = rowsToDownload.map((customer) => [
      customer.id,
      customer.name,
      customer.email,
      customer.phone,
      customer.address,
      customer.isActive ? "Enable" : "Disable",
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "customers.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const from = total === 0 ? 0 : (page - 1) * limit + 1;

  const to = Math.min(page * limit, total);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleEdit = (customer: CustomerRow) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (customer: CustomerRow) => {
    setUpdatingStatusId(customer.id);
    setStatusError(null);

    try {
      const res = await fetch(`/api/v1/customers/${customer.recordId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !customer.isActive,
          source: customer.source,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        throw new Error(data?.message || `Server error: ${res.status}`);
      }

      await refresh();
      await fetchAllCustomers();
      onCustomersChanged?.();
    } catch (err) {
      setStatusError(
        err instanceof Error ? err.message : "Unable to update customer status",
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const firstVisiblePage = Math.max(
    1,
    Math.min(page - 2, Math.max(totalPages - 4, 1)),
  );

  const visiblePages = Array.from(
    {
      length: Math.min(5, totalPages),
    },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <>
      <div className="w-full max-w-full bg-white border border-[#cbd5e1] rounded-2xl overflow-hidden flex flex-col min-h-0 shadow-[0_8px_24px_rgba(15,23,42,0.06)] box-border">
        {/* HEADER */}
        <div className="w-full flex justify-between items-center gap-3 px-5 py-3.5 border-b border-[#e5e7eb] bg-white box-border">
          <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
            <span className="text-lg font-semibold text-[#002B73]">
              Active Directory
            </span>

            {stats.newToday > 0 && (
              <span className="bg-[#E0E7FF] text-[#1D4ED8] px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap">
                +{stats.newToday} New Today
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* FILTER BUTTON */}
            <button
              type="button"
              className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#64748B] bg-transparent cursor-pointer flex-shrink-0 hover:bg-gray-50 transition-colors"
              aria-label="Filter customers"
              onClick={() => {
                setShowFilter((prev) => {
                  const next = !prev;

                  if (next) {
                    void fetchAllCustomers();
                  }

                  return next;
                });
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>

            {/* DOWNLOAD BUTTON */}
            <button
              type="button"
              className={`w-11 h-11 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-[#64748B] bg-transparent cursor-pointer flex-shrink-0 hover:bg-gray-50 transition-colors ${
                downloadCustomers.length === 0 || allCustomersLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              aria-label="Download customers"
              onClick={handleDownload}
              disabled={downloadCustomers.length === 0 || allCustomersLoading}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* FILTER */}
        {showFilter && (
          <div className="flex gap-2.5 px-5 py-3.5 border-b border-[#e5e7eb] bg-[#F8FAFC] flex-wrap items-center box-border">
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 min-w-[180px] sm:min-w-[200px] h-10 border border-[#CBD5E1] rounded-lg px-3 text-[12px] outline-none box-border focus:border-[#003B7A] transition-colors bg-white text-[#0F172A]"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as "all" | "Enable" | "Disable");

                void fetchAllCustomers();
              }}
              className="flex-0 min-w-[130px] h-10 border border-[#CBD5E1] rounded-lg px-3 text-[12px] bg-white outline-none focus:border-[#003B7A] transition-colors text-[#0F172A]"
            >
              <option value="all">All Status</option>

              <option value="Enable">Enable</option>

              <option value="Disable">Disable</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearchText("");
                setStatusFilter("all");
              }}
              className="h-10 border border-[#CBD5E1] rounded-lg px-4 bg-white cursor-pointer font-semibold text-[#334155] hover:bg-gray-50 transition-colors text-[12px]"
            >
              Clear
            </button>

            <span className="text-[13px] text-[#64748B]">
              {allCustomersLoading
                ? "Loading all customers..."
                : `${filteredAllCustomers.length} result(s)`}
            </span>
          </div>
        )}

        {/* ERROR */}
        {statusError && (
          <div
            role="alert"
            className="px-5 py-3 text-[#b91c1c] bg-[#fef2f2] border-b border-[#fecaca] text-[12px] font-semibold overflow-anywhere"
          >
            {statusError}
          </div>
        )}

        {/* TABLE */}
        <div className="w-full overflow-x-auto overflow-y-visible">
          <table className="w-full min-w-[1100px] table-fixed border-collapse">
            <colgroup>
              <col style={{ width: "11%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>

            <thead>
              <tr>
                <th className="text-center px-3 py-4 bg-[#F8FAFC] text-[#64748B] text-[12px] font-bold border-b border-[#E5E7EB]">
                  Customer ID
                </th>

                <th className="text-center px-3 py-4 bg-[#F8FAFC] text-[#64748B] text-[12px] font-bold border-b border-[#E5E7EB]">
                  Customer Name
                </th>

                <th className="text-center px-3 py-4 bg-[#F8FAFC] text-[#64748B] text-[12px] font-bold border-b border-[#E5E7EB]">
                  Email Address
                </th>

                <th className="text-center px-3 py-4 bg-[#F8FAFC] text-[#64748B] text-[12px] font-bold border-b border-[#E5E7EB]">
                  Phone Number
                </th>

                <th className="text-center px-3 py-4 bg-[#F8FAFC] text-[#64748B] text-[12px] font-bold border-b border-[#E5E7EB]">
                  Customer Address
                </th>

                <th className="text-center px-3 py-4 bg-[#F8FAFC] text-[#64748B] text-[12px] font-bold border-b border-[#E5E7EB]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading || allCustomersLoading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="py-16 text-center text-[#64748B] text-[15px]">
                      Loading customers...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6}>
                    <div className="py-16 text-center text-[#d32f2f] text-[15px]">
                      Error: {error}
                    </div>
                  </td>
                </tr>
              ) : tableCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="py-16 text-center text-[#64748B] text-[15px]">
                      No customers found.{" "}
                      <button
                        type="button"
                        className="text-[#174092] font-semibold underline cursor-pointer bg-none border-none text-[15px]"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Add your first customer →
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                tableCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-[#f8fafc] transition-colors"
                  >
                    {/* CUSTOMER ID */}
                    <td className="px-3 py-3 border-b border-[#E5E7EB] text-center align-middle">
                      <div className="w-full min-w-0 max-w-full">
                        <span className="block break-words text-[10px] text-[#64748B] font-mono">
                          #{customer.id}
                        </span>
                      </div>
                    </td>

                    {/* CUSTOMER NAME */}
                    <td className="px-3 py-3 border-b border-[#E5E7EB] align-middle">
                      <div className="w-full min-w-0 max-w-full">
                        <div className="flex items-center gap-2.5 min-w-0 pl-11 text-left">
                          {/* Customer initials */}
                          {/*
                            <span className="w-8 h-8 min-w-8 rounded-full bg-[#DBEAFE] text-[#1E40AF] text-[13px] font-bold flex items-center justify-center">
                              {customer.initials}
                            </span>
                            */}

                          <div className="min-w-0 max-w-full overflow-hidden">
                            <span className="block break-words overflow-wrap-anywhere text-[12px] text-[#0F172A]">
                              {customer.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-3 py-3 border-b border-[#E5E7EB] align-middle">
                      <div className="w-full min-w-0 max-w-full pl-15">
                        <span className="block break-words overflow-wrap-anywhere text-left text-[12px] text-[#0F172A]">
                          {customer.email}
                        </span>
                      </div>
                    </td>

                    {/* PHONE */}
                    <td className="px-3 py-3 border-b border-[#E5E7EB] align-middle">
                      <div className="w-full min-w-0 max-w-full text-center">
                        <span className="block break-words text-[12px] text-[#0F172A]">
                          {customer.phone}
                        </span>
                      </div>
                    </td>

                    {/* ADDRESS */}
                    <td className="px-3 py-3 border-b border-[#E5E7EB] align-middle">
                      <div className="w-full min-w-0 max-w-full pl-18">
                        <span className="block break-words overflow-wrap-anywhere text-left text-[12px] text-[#0F172A]">
                          {customer.address}
                        </span>
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="border-b border-[#E5E7EB] text-center align-middle">
                      <div className="flex items-center justify-center gap-2 p-3">
                        {customer.isActive && (
                          <button
                            type="button"
                            className="w-12 h-8 flex items-center justify-center rounded-lg border border-[#cbd5e1] text-[#0f172a] bg-white cursor-pointer flex-shrink-0 hover:bg-gray-50 transition-colors"
                            aria-label="Edit customer"
                            onClick={() => handleEdit(customer)}
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                        )}

                        <button
                          type="button"
                          className={`min-w-[68px] h-7 px-2 rounded-md font-semibold leading-none cursor-pointer flex-shrink-0 whitespace-nowrap transition-opacity ${
                            customer.isActive
                              ? "text-[#b91c1c] border border-[#fecaca] bg-[#fef2f2] hover:bg-[#fee2e2]"
                              : "text-[#166534] border border-[#bbf7d0] bg-[#f0fdf4] hover:bg-[#dcfce7]"
                          } ${
                            updatingStatusId === customer.id ? "opacity-55" : ""
                          }`}
                          onClick={() => handleStatusChange(customer)}
                          disabled={updatingStatusId === customer.id}
                        >
                          {updatingStatusId === customer.id
                            ? "..."
                            : customer.isActive
                              ? "Disable"
                              : "Enable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-2 bg-white border-t border-[#e5e7eb] flex-shrink-0 box-border">
          <div className="text-[12px] text-[#64748B] text-center sm:text-left min-w-0">
            {isFiltering
              ? `Showing ${tableCustomers.length} filtered customer(s)`
              : total > 0
                ? `Showing ${from}–${to} of ${total} customers`
                : "No customers"}
          </div>

          {!isFiltering && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5">
              {/* PREVIOUS */}
              <button
                type="button"
                className={`w-9 h-9 flex items-center justify-center border border-transparent bg-white rounded-lg text-[12px] text-[#334155] cursor-pointer flex-shrink-0 hover:bg-gray-50 transition-colors ${
                  page <= 1 ? "opacity-40 cursor-not-allowed" : ""
                }`}
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
              >
                &lt;
              </button>

              {/* PAGE NUMBERS */}
              {visiblePages.map((p) => (
                <button
                  type="button"
                  key={p}
                  className={`w-9 h-9 flex items-center justify-center border border-transparent rounded-lg text-[12px] cursor-pointer flex-shrink-0 transition-colors ${
                    p === page
                      ? "bg-[#003B7A] text-white border-[#003B7A] shadow-[0_4px_10px_rgba(0,59,122,0.18)]"
                      : "bg-white text-[#334155] hover:bg-gray-50"
                  }`}
                  onClick={() => goToPage(p)}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}

              {/* NEXT */}
              <button
                type="button"
                className={`w-9 h-9 flex items-center justify-center border border-transparent bg-white rounded-lg text-[9px] text-[#334155] cursor-pointer flex-shrink-0 hover:bg-gray-50 transition-colors ${
                  page >= totalPages ? "opacity-40 cursor-not-allowed" : ""
                }`}
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT CUSTOMER MODAL */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={async () => {
          await refresh();
          await fetchAllCustomers();
          onCustomersChanged?.();
        }}
        initialData={editingCustomer}
      />
    </>
  );
};

export default CustomerTable;
